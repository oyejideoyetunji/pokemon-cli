export type CacheEntry<T> = {
  createdAT: number;
  value: T
}

export class Cache {
  #cache = new Map<string, CacheEntry<any>>();
  #reapIntervalId: NodeJS.Timeout | undefined;
  #interval: number;

  constructor(interval: number) {
    this.#interval = interval;

    this.#startReapLoop();
  }

  add<T>(key: string, value: T){
    this.#cache.set(key, { createdAT: Date.now(), value });
  }

  get<T>(key: string) {
    return this.#cache.get(key) as CacheEntry<T>;
  }

  stopReapLoop() {
    clearInterval(this.#reapIntervalId);

    this.#reapIntervalId = undefined;
  }

  #reap() {
    this.#cache.forEach((_, key) => {
      if (!this.#cache.get(key)?.createdAT) {
        this.#cache.delete(key)

        return;
      }

      if((this.#cache.get(key) as CacheEntry<any>).createdAT < (Date.now() - this.#interval)) {
        this.#cache.delete(key);
        console.log(`Cleaned up: ${key}`)
      }
    })
  }

  #startReapLoop() {
    this.#reapIntervalId = setInterval(() => {
      this.#reap();
    }, this.#interval);
  }
}
