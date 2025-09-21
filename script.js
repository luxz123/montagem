const audio = document.getElementById('audio');
const playBtn = document.getElementById('playPause');
const stopBtn = document.getElementById('stop');
const vol = document.getElementById('volume');
const status = document.getElementById('status');
const autoplayBtn = document.getElementById('autoplayTry');
const dl = document.getElementById('download');

// set initial volume
audio.volume = parseFloat(vol.value);

function updateStatus(text){
  status.textContent = 'Status: ' + text;
}

playBtn.addEventListener('click', async () => {
  try {
    if (audio.paused) {
      await audio.play();
      playBtn.textContent = 'Pause ⏸';
      updateStatus('Memutar');
    } else {
      audio.pause();
      playBtn.textContent = 'Play ▶️';
      updateStatus('Jeda');
    }
  } catch (err) {
    console.error(err);
    updateStatus('Gagal memutar — interaksi diperlukan atau file tidak ditemukan.');
    alert('Browser memblokir autoplay. Silakan klik OK lalu coba tombol Play lagi.');
  }
});

stopBtn.addEventListener('click', () => {
  audio.pause();
  audio.currentTime = 0;
  playBtn.textContent = 'Play ▶️';
  updateStatus('Dihentikan');
});

vol.addEventListener('input', () => {
  audio.volume = parseFloat(vol.value);
  updateStatus('Volume: ' + Math.round(audio.volume * 100) + '%');
});

autoplayBtn.addEventListener('click', async () => {
  try {
    audio.currentTime = 0;
    await audio.play();
    playBtn.textContent = 'Pause ⏸';
    updateStatus('Autoplay berhasil');
  } catch (err) {
    console.warn('Autoplay error', err);
    updateStatus('Autoplay diblokir oleh browser — klik Play untuk memulai.');
    alert('Autoplay diblokir pada browser ini. Silakan klik tombol Play untuk memutar.');
  }
});

dl.addEventListener('click', () => {
  const url = audio.querySelector('source').src;
  const a = document.createElement('a');
  a.href = url;
  a.download = 'hei_tayo.mp3';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
});

audio.addEventListener('ended', () => {
  playBtn.textContent = 'Play ▶️';
  updateStatus('Selesai');
});

audio.addEventListener('error', (e) => {
  updateStatus('Error memuat file audio. Periksa URL atau koneksi.');
  console.error('Audio error', e);
});

window.addEventListener('load', async () => {
  try {
    await audio.play();
    playBtn.textContent = 'Pause ⏸';
    updateStatus('Autoplay (berhasil)');
  } catch (err) {
    updateStatus('Autoplay diblokir — klik Play.');
  }
});