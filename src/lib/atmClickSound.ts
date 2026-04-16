import clickSoundSrc from "@/assets/79020_engreitz_atm-buttons-2 (mp3cut.net).mp3";
import cashWithdrawalSoundSrc from "@/assets/ATM Cash Withdrawal Sound Effect(HD) (mp3cut.net).mp3";

const FALLBACK_WITHDRAWAL_DURATION_MS = 4200;

const clickAudioPool: HTMLAudioElement[] = [];
let withdrawalAudio: HTMLAudioElement | null = null;
let withdrawalDurationPromise: Promise<number> | null = null;

function createAudio(src: string) {
  const audio = new Audio(src);
  audio.preload = "auto";
  return audio;
}

function getClickAudio() {
  const reusableAudio = clickAudioPool.find((audio) => audio.paused || audio.ended);

  if (reusableAudio) {
    return reusableAudio;
  }

  const nextAudio = createAudio(clickSoundSrc);
  clickAudioPool.push(nextAudio);
  return nextAudio;
}

function getWithdrawalAudio() {
  if (!withdrawalAudio) {
    withdrawalAudio = createAudio(cashWithdrawalSoundSrc);
  }

  return withdrawalAudio;
}

export async function playAtmClickSound() {
  if (typeof window === "undefined") {
    return;
  }

  const audio = getClickAudio();
  audio.currentTime = 0;

  try {
    await audio.play();
  } catch {
    // Ignore autoplay-related failures and keep the UI responsive.
  }
}

export async function playCashWithdrawalSound() {
  if (typeof window === "undefined") {
    return;
  }

  const audio = getWithdrawalAudio();
  audio.pause();
  audio.currentTime = 0;

  try {
    await audio.play();
  } catch {
    // Ignore autoplay-related failures and let the loading state continue.
  }
}

export function stopCashWithdrawalSound() {
  if (!withdrawalAudio) {
    return;
  }

  withdrawalAudio.pause();
  withdrawalAudio.currentTime = 0;
}

export function getCashWithdrawalDurationMs() {
  if (typeof window === "undefined") {
    return Promise.resolve(FALLBACK_WITHDRAWAL_DURATION_MS);
  }

  if (withdrawalDurationPromise) {
    return withdrawalDurationPromise;
  }

  const audio = getWithdrawalAudio();

  if (Number.isFinite(audio.duration) && audio.duration > 0) {
    return Promise.resolve(audio.duration * 1000);
  }

  withdrawalDurationPromise = new Promise<number>((resolve) => {
    const handleLoadedMetadata = () => {
      cleanup();
      resolve(
        Number.isFinite(audio.duration) && audio.duration > 0
          ? audio.duration * 1000
          : FALLBACK_WITHDRAWAL_DURATION_MS,
      );
    };

    const handleError = () => {
      cleanup();
      resolve(FALLBACK_WITHDRAWAL_DURATION_MS);
    };

    const cleanup = () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("error", handleError);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata, { once: true });
    audio.addEventListener("error", handleError, { once: true });
    audio.load();
  }).finally(() => {
    withdrawalDurationPromise = null;
  });

  return withdrawalDurationPromise;
}
