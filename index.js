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
    startCountdown(); 
    setupFadeIn();    
    checkScheduleStatus(); // Cek status jadwal saat dimuat (Permintaan 1)
});

// ------------------
// 1. Light/Dark Mode Logic (Perbaikan Transisi Global)
// ------------------
const body = document.body;
const html = document.documentElement; // Ambil elemen HTML root
const toggleButton = document.getElementById('mode-toggle');
const sunIcon = document.getElementById('sun-icon');
const moonIcon = document.getElementById('moon-icon');

const toggleButtonMobile = document.getElementById('mode-toggle-mobile');
const sunIconMobile = document.getElementById('sun-icon-mobile');
const moonIconMobile = document.getElementById('moon-icon-mobile');

function setDarkMode(isDark) {
    if (isDark) {
        html.classList.remove('light');
        html.classList.add('dark');
        body.classList.remove('light');
        body.classList.add('dark');
        
        // Update Ikon
        if (moonIcon) moonIcon.classList.add('hidden');
        if (sunIcon) sunIcon.classList.remove('hidden');
        if (moonIconMobile) moonIconMobile.classList.add('hidden');
        if (sunIconMobile) sunIconMobile.classList.remove('hidden');
        localStorage.setItem('theme', 'dark');
    } else {
        html.classList.remove('dark');
        html.classList.add('light');
        body.classList.remove('dark');
        body.classList.add('light');
        
        // Update Ikon
        if (sunIcon) sunIcon.classList.add('hidden');
        if (moonIcon) moonIcon.classList.remove('hidden');
        if (sunIconMobile) sunIconMobile.classList.add('hidden');
        if (moonIconMobile) moonIconMobile.classList.remove('hidden');
        localStorage.setItem('theme', 'light');
    }
}

export function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        setDarkMode(true);
    } else {
        setDarkMode(false);
    }

    if (toggleButton) {
        toggleButton.addEventListener('click', () => {
            const isDark = html.classList.contains('dark');
            setDarkMode(!isDark);
        });
    }

    if (toggleButtonMobile) {
        toggleButtonMobile.addEventListener('click', () => {
            const isDark = html.classList.contains('dark');
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
        // Menggunakan kelas 'open' seperti yang didefinisikan di CSS
        mobileMenu.classList.add('open'); 
        menuOverlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; 
    }
}

function closeMenu() {
    if (mobileMenu && menuOverlay) {
        // Menggunakan kelas 'open' seperti yang didefinisikan di CSS
        mobileMenu.classList.remove('open');
        menuOverlay.classList.add('hidden');
        document.body.style.overflow = 'auto'; 
    }
}

export function setupMobileMenu() {
    const hamburgerButton = document.getElementById('hamburger');
    const closeMenuButton = document.getElementById('close-menu');

    if (hamburgerButton) {
        hamburgerButton.addEventListener('click', openMenu);
    }
    
    if (closeMenuButton) {
        closeMenuButton.addEventListener('click', closeMenu);
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
// 3. Lomba Tabs Logic (Permintaan 1: Perbaikan Tampilan Non-Aktif di Light Mode)
// ------------------
export function setupTabs() {
    const tabs = document.querySelectorAll('.tab-button');
    const categories = document.querySelectorAll('#smp, #sma');

    // Fungsi untuk mengaktifkan tab
    const activateTab = (tab) => {
        tabs.forEach(t => {
  // Hapus kelas aktif dari semua tombol
        t.classList.remove('bg-teal-500', 'text-white', 'dark:bg-cyan-500', 'dark:text-gray-900');
        
        // Tambahkan kelas non-aktif (default + hover untuk non-aktif)
        t.classList.add('text-gray-700', 'dark:text-gray-300', 'hover:bg-gray-800', 'hover:text-white', 'dark:hover:bg-gray-600', 'dark:hover:text-white'); 
    });
    
    /// Tambahkan kelas aktif ke tombol yang diklik
    tab.classList.add('bg-teal-500', 'text-white', 'dark:bg-cyan-500', 'dark:text-gray-900');
    
    // Hapus kelas non-aktif/hover non-aktif dari tombol yang diklik 
    // Agar tab yang aktif tidak berubah warna saat di-hover
    tab.classList.remove('text-gray-700', 'dark:text-gray-300', 'hover:bg-gray-800', 'hover:text-white', 'dark:hover:bg-gray-600', 'dark:hover:text-white');    categories.forEach(category => {
            category.classList.add('hidden');
            category.classList.remove('grid');
        });
        const targetContent = document.getElementById(tab.getAttribute('data-target'));
        if (targetContent) {
            targetContent.classList.remove('hidden');
            targetContent.classList.add('grid');
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        }
    };

    tabs.forEach(tab => {
        tab.addEventListener('click', () => activateTab(tab));
    });

    // Set default tab (SMP)
    const defaultTab = document.getElementById('tab-smp');
    if (defaultTab) {
        activateTab(defaultTab);
    }
}

// ------------------
// 4. WhatsApp Auto Text Function (Revisi CP & Sopan Santun)
// ------------------
function register(lombaName, level) {
    let phoneNumber;
    let cpName;

    // Tentukan CP berdasarkan level
    if (level.includes('SMP')) {
        phoneNumber = '6282124292621'; // Eva
        cpName = 'Kak Eva';
    } else if (level.includes('SMA')) {
        phoneNumber = '6283151299112'; // Fulita
        cpName = 'Kak Fulita';
    } else {
        // Fallback ke CP General (Bu Juli)
        phoneNumber = '6281269206036';
        cpName = 'Bu Juli';
    }

    // Membuat teks pesan (URL-encoded)
    // Penambahan "Kak" untuk Eva dan Fulita
    const message = encodeURIComponent(
        `Halo ${cpName}, saya ingin bertanya tentang pendaftaran lomba ${lombaName} untuk tingkat ${level} di acara FESTASIMA Season-4.`
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
// 5. Countdown Timer Logic
// ------------------
export function startCountdown() {
    // Tanggal target: 20 Januari 2026, 23:59:59 WIB (Batas Pendaftaran)
    // Perhatikan: Bulan di JavaScript 0-indexed (0=Januari)
    const targetYear = 2026;
    const targetMonth = 0; // Januari
    const targetDay = 20;
    const targetHour = 23;
    const targetMinute = 59;
    const targetSecond = 59;

    const targetDate = new Date(targetYear, targetMonth, targetDay, targetHour, targetMinute, targetSecond).getTime();

    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");

    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        // Perhitungan waktu
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

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
            const countdownContainer = document.getElementById("countdown-timer").querySelector('h2');
            if (countdownContainer) {
                countdownContainer.textContent = "Pendaftaran TELAH DITUTUP";
            }
            // Panggil checkScheduleStatus lagi untuk update marker setelah countdown selesai
            checkScheduleStatus(); 
        }
    };

    // Panggil fungsi segera saat start
    updateCountdown(); 
    
    // Update setiap 1 detik
    const countdownInterval = setInterval(updateCountdown, 1000);
}

// ------------------
// 6. Fade In Animation Logic (Permintaan 2)
// ------------------
export function setupFadeIn() {
    const fadeInElements = document.querySelectorAll('.fade-in-content');

    // Gunakan Intersection Observer untuk memicu animasi saat elemen masuk viewport
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Tambahkan sedikit delay berdasarkan kelas delay di HTML
                let delay = 0;
                // REVISI: Nilai delay dikurangi (langkah 50ms) agar stagger lebih cepat
                if (entry.target.classList.contains('delay-100')) delay = 50;
                else if (entry.target.classList.contains('delay-200')) delay = 100;
                else if (entry.target.classList.contains('delay-300')) delay = 150;
                else if (entry.target.classList.contains('delay-400')) delay = 200;
                else if (entry.target.classList.contains('delay-500')) delay = 250;
                else if (entry.target.classList.contains('delay-600')) delay = 300;
                else if (entry.target.classList.contains('delay-700')) delay = 350;

                setTimeout(() => {
                    entry.target.classList.add('visible'); // Tambahkan kelas 'visible'
                    observer.unobserve(entry.target);
                }, delay);
            }
        });
    }, { threshold: 0.1 }); // Mulai animasi saat 10% elemen terlihat

    fadeInElements.forEach(element => {
        observer.observe(element);
    });
}

// ------------------
// 7. Schedule Status Check (Permintaan 1)
// ------------------

// Daftar semua event timeline beserta tanggalnya
const timelineEvents = [
    // Permintaan 1: Batas Akhir Pendaftaran Peserta (20 Jan 2026)
    { id: 'status-pendaftaran', date: new Date(2026, 0, 20, 23, 59, 59) }, 
    // Acara Utama
    { id: 'date-2026-01-25', date: new Date(2026, 0, 25) },  // Technical Meeting (Jan 25)
    { id: 'date-2026-02-05', date: new Date(2026, 1, 5) },   // Pembukaan & Lomba H-1 (Feb 5)
    { id: 'date-2026-02-06', date: new Date(2026, 1, 6) },   // Lomba H-2 (Feb 6)
    { id: 'date-2026-02-07', date: new Date(2026, 1, 7) },   // Lomba H-3 & Penutupan (Feb 7)
];

export function checkScheduleStatus() {
    const now = new Date();
    const pendaftaranEndDate = new Date(2026, 0, 20, 23, 59, 59);

    const isSameDay = (date1, date2) => {
        return date1.getFullYear() === date2.getFullYear() &&
               date1.getMonth() === date2.getMonth() &&
               date1.getDate() === date2.getDate();
    };

    timelineEvents.forEach(item => {
        const statusElement = document.getElementById(item.id);
        if (statusElement) {
            // Hapus semua kelas warna default
            statusElement.classList.remove('bg-red-500', 'bg-green-500', 'bg-blue-500', 'dark:bg-red-500', 'dark:bg-green-500', 'dark:bg-blue-500', 'bg-gray-400', 'dark:bg-gray-600'); 

            if (item.id === 'status-pendaftaran') {
                // Logika Pendaftaran: Hijau jika belum ditutup (Permintaan 1)
                if (now < pendaftaranEndDate) { 
                    statusElement.classList.add('bg-green-500', 'dark:bg-green-500'); // Sedang Berlangsung (Pendaftaran)
                } else {
                    statusElement.classList.add('bg-gray-400', 'dark:bg-gray-600'); // Sudah Lewat/Ditutup
                }
            } else {
                // Logika Acara Utama (TM, Hari 1, 2, 3)
                if (isSameDay(now, item.date)) {
                    statusElement.classList.add('bg-blue-500', 'dark:bg-blue-500'); // Sedang Berlangsung (Hari H)
                } else if (now > item.date) {
                    statusElement.classList.add('bg-gray-400', 'dark:bg-gray-600'); // Sudah Lewat
                } else {
                    statusElement.classList.add('bg-gray-400', 'dark:bg-gray-600'); // Belum Mulai
                }
            }
        }
    });
}