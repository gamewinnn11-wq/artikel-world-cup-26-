/**
 * ==========================================================================
 * FIFA WORLD CUP 2026™ - FAN ZONE FORM HANDLER (form.js)
 * Murni Vanilla JavaScript Tanpa Library Eksternal
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('fanzone-form');
    const inputNama = document.getElementById('nama');
    const inputEmail = document.getElementById('email');
    const selectTim = document.getElementById('tim');

    // Key untuk penyimpanan di localStorage browser
    const STORAGE_KEY = 'fanzone_pendaftaran_2026';

    // 1. REPOPULATE DATA: Otomatis isi kembali nilai input dari localStorage jika ada
    function repopulateForm() {
        const savedDataJson = localStorage.getItem(STORAGE_KEY);
        if (savedDataJson) {
            try {
                const savedData = JSON.parse(savedDataJson);
                if (savedData.nama) inputNama.value = savedData.nama;
                if (savedData.email) inputEmail.value = savedData.email;
                if (savedData.tim) selectTim.value = savedData.tim;
                console.log('Data form Fan Zone berhasil dimuat kembali dari localStorage.');
            } catch (error) {
                console.error('Gagal membaca data dari localStorage:', error);
            }
        }
    }

    // Panggil fungsi repopulate saat DOM selesai dimuat
    repopulateForm();

    // 2. HANDLE SUBMIT FORM
    if (form) {
        form.addEventListener('submit', function (e) {
            // Cegah perilaku default browser agar halaman tidak reload
            e.preventDefault();

            // Ambil nilai dari ketiga input form
            const nama = inputNama.value.trim();
            const email = inputEmail.value.trim();
            const tim = selectTim.value;

            // Validasi tambahan (meskipun HTML5 required sudah bekerja)
            if (!nama || !email || !tim) {
                alert('Mohon lengkapi seluruh data formulir sebelum mendaftar.');
                return;
            }

            // Buat objek data yang akan disimpan
            const formData = {
                nama: nama,
                email: email,
                tim: tim,
                timestamp: new Date().toISOString()
            };

            // Simpan data ke dalam localStorage dalam format JSON String
            localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));

            // Tampilkan alert sukses kepada pengguna
            alert(`🎉 Pendaftaran Fan Zone 2026 Berhasil!\n\nTerima kasih, ${nama}!\nData dukungan Anda untuk tim ${tim} telah disimpan dengan aman di browser (localStorage).\n\nSaat Anda merefresh halaman ini, data Anda tidak akan hilang!`);
        });
    }
});
