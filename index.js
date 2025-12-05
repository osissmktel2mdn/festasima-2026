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
    checkScheduleStatus(); // Cek status jadwal saat dimuat
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
        // Tambahkan kelas untuk animasi slide-in
        mobileMenu.classList.add('transform', 'translate-x-0');
        mobileMenu.classList.remove('transform', 'translate-x-full');
        menuOverlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; 
    }
}

function closeMenu() {
    if (mobileMenu && menuOverlay) {
        // Tambahkan kelas untuk animasi slide-out
        mobileMenu.classList.remove('transform', 'translate-x-0');
        mobileMenu.classList.add('transform', 'translate-x-full');
        // Delay hide overlay untuk menyelesaikan animasi slide-out
        setTimeout(() => {
            menuOverlay.classList.add('hidden');
            document.body.style.overflow = 'auto'; 
        }, 300); // Sesuaikan dengan durasi transisi CSS
    }
}

export function setupMobileMenu() {
    // Pastikan mobileMenu default tersembunyi
    if (mobileMenu) {
        mobileMenu.classList.add('transform', 'translate-x-full', 'transition-transform', 'duration-300');
    }
    
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
// 3. Lomba Tabs Logic
// ------------------
export function setupTabs() {
    const tabs = document.querySelectorAll('.tab-button');
    const categories = document.querySelectorAll('#smp, #sma');

    // Fungsi untuk mengaktifkan tab
    const activateTab = (tab) => {
        // Dapatkan warna accent dari variabel CSS
        const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--color-accent');
        
        tabs.forEach(t => {
            // Hapus kelas aktif dari semua tombol
            t.classList.remove('border-b-4', 'border-accent');
            t.classList.add('text-gray-700', 'dark:text-gray-300', 'hover:text-accent');
            // Hapus kelas warna bg dari tab
            t.classList.remove('bg-teal-500', 'text-white', 'dark:bg-cyan-500', 'dark:text-gray-900');
        });

        // Tambahkan kelas aktif ke tombol yang diklik
        tab.classList.add('border-b-4');
        tab.style.borderColor = accentColor;
        tab.classList.remove('text-gray-700', 'dark:text-gray-300');


        categories.forEach(category => {
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
// 4. WhatsApp Auto Text Function (Diubah ke versi yang lebih singkat)
// ------------------
function register(lombaName, level) {
    let phoneNumber;

    // Tentukan CP berdasarkan level
    if (level.includes('SMP')) {
        phoneNumber = '6282124292621'; // Eva
    } else if (level.includes('SMA')) {
        phoneNumber = '6283151299112'; // Fulita
    } else {
        // Fallback ke CP General (Bu Juli)
        phoneNumber = '6281269206036'; 
    }

    // Membuat teks pesan (URL-encoded) - Versi yang lebih singkat
    const message = encodeURIComponent(
        `Permisi, saya mau daftar/bertanya tentang lomba ${lombaName} (${level}) untuk FESTASIMA Season-4.`
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
            const countdownContainer = document.getElementById("countdown-timer").querySelector('h2');
            if (countdownContainer) {
                 countdownContainer.textContent = "Pendaftaran TELAH DITUTUP";
            }
        }
    }, 1000);
}

// ------------------
// 6. Fade In Animation Logic (Dipastikan kembali berfungsi di semua elemen)
// ------------------
export function setupFadeIn() {
    const fadeInElements = document.querySelectorAll('.fade-in-content');
    
    // Gunakan Intersection Observer untuk memicu animasi saat elemen masuk viewport
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                 // Tambahkan sedikit delay berdasarkan indeks untuk efek berurutan
                setTimeout(() => {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target); // Stop observing once visible
                }, index * 100); 
            }
        });
    }, {
        threshold: 0.1 // Pemicu ketika 10% elemen terlihat
    });

    fadeInElements.forEach(el => {
        // Pastikan elemen memiliki class awal (di CSS harus ada .fade-in-content { opacity: 0; transform: translateY(20px); transition: ... } )
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';

        // Logika untuk menampilkan
        const style = document.createElement('style');
        style.textContent = `
            .fade-in-content.visible {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        `;
        document.head.appendChild(style);

        observer.observe(el);
    });
}


// ------------------
// 7. Jadwal Acara Status (Timeline Marker Logic) - Pendaftaran Hijau sebelum 20 Jan 2026
// ------------------
export function checkScheduleStatus() {
    const now = new Date();
    // Tanggal batas pendaftaran: 20 Januari 2026, 23:59:59 (Bulan 0-indexed)
    const pendaftaranEndDate = new Date(2026, 0, 20, 23, 59, 59);

    // Linimasa acara
    const timelineEvents = [
        { id: 'status-pendaftaran', date: pendaftaranEndDate },
        { id: 'status-25-01-2026', date: new Date(2026, 0, 25, 0, 0, 0) }, // 25 Jan 2026 (TM)
        { id: 'status-05-02-2026', date: new Date(2026, 1, 5, 0, 0, 0) }, // 5 Feb 2026 (Acara 1)
        { id: 'status-06-02-2026', date: new Date(2026, 1, 6, 0, 0, 0) }, // 6 Feb 2026 (Acara 2)
        { id: 'status-07-02-2026', date: new Date(2026, 1, 7, 0, 0, 0) }, // 7 Feb 2026 (Acara 3)
    ];

    const isSameDay = (date1, date2) => {
        return date1.getFullYear() === date2.getFullYear() &&
               date1.getMonth() === date2.getMonth() &&
               date1.getDate() === date2.getDate();
    };

    timelineEvents.forEach(item => {
        const statusElement = document.getElementById(item.id);
        if (statusElement) {
            // Hapus semua kelas warna default
            statusElement.classList.remove('bg-red-500', 'bg-green-500', 'dark:bg-red-500', 'dark:bg-green-500');

            if (item.id === 'status-pendaftaran') {
                // Logika Pendaftaran: Hijau jika belum ditutup (sesuai permintaan)
                if (now < item.date) {
                    statusElement.classList.add('bg-green-500', 'dark:bg-green-500'); // Sedang Berlangsung (Pendaftaran)
                } else {
                    statusElement.classList.add('bg-red-500', 'dark:bg-red-500'); // Sudah Lewat
                }
            } else {
                // Logika Acara Utama (TM, Hari 1, 2, 3): Hijau jika hari ini
                if (isSameDay(now, item.date)) {
                    statusElement.classList.add('bg-green-500', 'dark:bg-green-500'); // Sedang Berlangsung (Hari H)
                } else if (now > item.date) {
                     // Jika sudah lewat, beri warna merah (kecuali pendaftaran yang sudah di-handle di atas)
                     statusElement.classList.add('bg-red-500', 'dark:bg-red-500');
                }
            }
        }
    });
}