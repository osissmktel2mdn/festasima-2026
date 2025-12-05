// Pastikan Lucide Icons dimuat sebelum memanggilnya
document.addEventListener('DOMContentLoaded', () => {
    // Panggil Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Inisialisasi semua fungsi utama
    loadTheme();
    setupTabs();
    setupMobileMenu();
    setupRegisterButtons();
    startCountdown(); // Poin 5: Mulai Hitung Mundur
    setupFadeIn();    // Poin 8: Setup Animasi Fade In
});

// ------------------
// 1. Light/Dark Mode Logic
// ------------------
const body = document.body;
const toggleButton = document.getElementById('mode-toggle');
const sunIcon = document.getElementById('sun-icon');
const moonIcon = document.getElementById('moon-icon');

function setDarkMode(isDark) {
    if (isDark) {
        body.classList.remove('light');
        body.classList.add('dark');
        // Pastikan ikon ada sebelum memanggilnya
        if (moonIcon && sunIcon) {
            moonIcon.classList.add('hidden');
            sunIcon.classList.remove('hidden');
        }
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.remove('dark');
        body.classList.add('light');
        if (sunIcon && moonIcon) {
            sunIcon.classList.add('hidden');
            moonIcon.classList.remove('hidden');
        }
        localStorage.setItem('theme', 'light');
    }
}

export function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    // Default ke 'light' jika belum ada di localStorage atau mengikuti preferensi sistem
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        setDarkMode(true);
    } else {
        setDarkMode(false);
    }

    if (toggleButton) {
        toggleButton.addEventListener('click', () => {
            const isDark = body.classList.contains('dark');
            setDarkMode(!isDark);
        });
    }
}

// ------------------
// 2. Mobile Menu (Hamburger) Logic
// ------------------

const mobileMenu = document.getElementById('mobile-menu');
const menuOverlay = document.getElementById('mobile-menu-overlay');

function openMenu() {
    if (mobileMenu && menuOverlay) {
        mobileMenu.classList.add('active');
        menuOverlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Mencegah scrolling body saat menu terbuka
    }
}

function closeMenu() {
    if (mobileMenu && menuOverlay) {
        mobileMenu.classList.remove('active');
        menuOverlay.classList.add('hidden');
        document.body.style.overflow = 'auto'; // Mengizinkan scrolling body
    }
}

export function setupMobileMenu() {
    const hamburgerButton = document.getElementById('hamburger');
    
    if (hamburgerButton) {
        hamburgerButton.addEventListener('click', openMenu);
    }
    
    if (menuOverlay) {
        menuOverlay.addEventListener('click', closeMenu);
    }

    // Tutup menu saat link di klik (hanya untuk mobile menu)
    document.querySelectorAll('.menu-link').forEach(link => {
        link.addEventListener('click', closeMenu);
    });
}

// ------------------
// 3. Lomba Tabs Logic (Poin 4: Menghapus logika internal)
// ------------------
export function setupTabs() {
    const tabs = document.querySelectorAll('.tab-button');
    // Hanya ambil kategori SMP dan SMA
    const categories = document.querySelectorAll('#smp, #sma');

    // Menambahkan event listener ke semua tombol tab
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetId = tab.getAttribute('data-target');

            // Hapus kelas aktif dari semua tombol
            tabs.forEach(t => {
                t.classList.remove('bg-teal-500', 'text-white');
                t.classList.add('text-gray-700', 'dark:text-gray-300', 'hover:bg-gray-300', 'dark:hover:bg-gray-600');
            });

            // Tambahkan kelas aktif ke tombol yang diklik
            tab.classList.add('bg-teal-500', 'text-white');
            tab.classList.remove('text-gray-700', 'dark:text-gray-300', 'hover:bg-gray-300', 'dark:hover:bg-gray-600');

            // Sembunyikan semua konten dan hapus layout grid
            categories.forEach(category => {
                category.classList.add('hidden');
                category.classList.remove('grid');
            });

            // Tampilkan konten yang sesuai dan tambahkan layout grid
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.classList.remove('hidden');
                targetContent.classList.add('grid');
                // Re-initialize Lucide icons for new visible elements
                if (typeof lucide !== 'undefined') {
                    lucide.createIcons();
                }
            }
        });
    });

    // Set default tab (SMP)
    const defaultTab = document.getElementById('tab-smp');
    if (defaultTab) {
        defaultTab.click();
    }
}

// ------------------
// 4. WhatsApp Auto Text Function
// ------------------
function register(lombaName, level) {
    // Nomor WhatsApp Panitia (Placeholder) - Gunakan nomor Bendahara
    const phoneNumber = '6289876543210'; 

    // Membuat teks pesan (URL-encoded)
    const message = encodeURIComponent(
        `Halo Kak, saya ingin bertanya tentang pendaftaran lomba ${lombaName} untuk tingkat ${level} di acara FESTASIMA Season-4.`
    );

    const waLink = `https://wa.me/${phoneNumber}?text=${message}`;

    window.open(waLink, '_blank');
}

export function setupRegisterButtons() {
    document.querySelectorAll('.register-button').forEach(button => {
        button.addEventListener('click', (event) => {
            const lombaName = event.currentTarget.getAttribute('data-lomba');
            const level = event.currentTarget.getAttribute('data-level');
            register(lombaName, level);
        });
    });
}

// ------------------
// 5. Countdown Timer Logic (Diperbaiki: Tahun target diubah ke 2026)
// ------------------
export function startCountdown() {
    // Tanggal target: 20 Januari 2026, 23:59:59 WIB
    
    // Mengubah tahun target dari 2025 menjadi 2026 agar hitungan mundur berjalan
    const targetYear = 2026; 
    const targetMonth = 0; // Januari (0-indexed)
    const targetDay = 20;
    const targetHour = 23;
    const targetMinute = 59;
    const targetSecond = 59;
    
    // Membuat objek Date untuk 20 Jan 2026 23:59:59 di waktu lokal
    const countDownDate = new Date(targetYear, targetMonth, targetDay, targetHour, targetMinute, targetSecond).getTime();

    const countdownInterval = setInterval(function() {
        const now = new Date().getTime();
        const distance = countDownDate - now;

        // Perhitungan untuk hari, jam, menit, dan detik
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Ambil elemen HTML
        const daysEl = document.getElementById("days");
        const hoursEl = document.getElementById("hours");
        const minutesEl = document.getElementById("minutes");
        const secondsEl = document.getElementById("seconds");

        if (daysEl && hoursEl && minutesEl && secondsEl) {
            // Tampilkan hasil, pastikan format dua digit
            daysEl.innerHTML = String(days).padStart(2, '0');
            hoursEl.innerHTML = String(hours).padStart(2, '0');
            minutesEl.innerHTML = String(minutes).padStart(2, '0');
            secondsEl.innerHTML = String(seconds).padStart(2, '0');
        }

        // Jika hitungan mundur selesai (di bawah 0)
        if (distance < 0) {
            clearInterval(countdownInterval);
            if (daysEl && hoursEl && minutesEl && secondsEl) {
                daysEl.innerHTML = "00";
                hoursEl.innerHTML = "00";
                minutesEl.innerHTML = "00";
                secondsEl.innerHTML = "00";
            }
            // Tambahkan pesan jika pendaftaran ditutup
            const countdownContainer = document.getElementById("countdown-timer").querySelector('h2');
            if (countdownContainer) {
                 countdownContainer.textContent = "Pendaftaran TELAH DITUTUP";
            }
        }
    }, 1000);
}

// ------------------
// 6. Fade In Animation Logic (Poin 8)
// ------------------
export function setupFadeIn() {
    const fadeInElements = document.querySelectorAll('.fade-in-content');
    
    // Memberikan delay agar transisi terlihat
    setTimeout(() => {
        fadeInElements.forEach((el, index) => {
            // Tambahkan sedikit delay berdasarkan indeks untuk efek berurutan
            setTimeout(() => {
                el.classList.add('visible');
            }, index * 200); // Jeda 200ms antar elemen
        });
    }, 100); // Delay awal 100ms
}