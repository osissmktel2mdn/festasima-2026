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
        mobileMenu.classList.add('open'); 
        menuOverlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; 
    }
}

function closeMenu() {
    if (mobileMenu && menuOverlay) {
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

    const activateTab = (tab) => {
        tabs.forEach(t => {
            t.classList.remove('bg-teal-500', 'text-white', 'dark:bg-cyan-500', 'dark:text-gray-900');
            t.classList.add('text-gray-700', 'dark:text-gray-300', 'hover:bg-gray-800', 'hover:text-white', 'dark:hover:bg-gray-600', 'dark:hover:text-white'); 
        });
        
        tab.classList.add('bg-teal-500', 'text-white', 'dark:bg-cyan-500', 'dark:text-gray-900');
        tab.classList.remove('text-gray-700', 'dark:text-gray-300', 'hover:bg-gray-800', 'hover:text-white', 'dark:hover:bg-gray-600', 'dark:hover:text-white');

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

    const defaultTab = document.getElementById('tab-smp');
    if (defaultTab) {
        activateTab(defaultTab);
    }
}

// ------------------
// 4. WhatsApp Auto Text (Revisi CP & Sopan Santun)
// ------------------
function register(lombaName, level) {
    let phoneNumber;
    let cpName;

    if (level.includes('SMP')) {
        phoneNumber = '6282124292621'; // Eva
        cpName = 'Kak Eva';
    } else {
        phoneNumber = '6283151299112'; // Fulita
        cpName = 'Kak Fulita';
    }

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
// 5. Countdown Timer (Target: 3 Februari 2026)
// ------------------
export function startCountdown() {
    const targetDate = new Date(2026, 0, 24, 23, 59, 59).getTime(); // Bulan 1 adalah Februari

    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");

    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (daysEl && hoursEl && minutesEl && secondsEl) {
            daysEl.innerHTML = String(Math.max(0, days)).padStart(2, '0');
            hoursEl.innerHTML = String(Math.max(0, hours)).padStart(2, '0');
            minutesEl.innerHTML = String(Math.max(0, minutes)).padStart(2, '0');
            secondsEl.innerHTML = String(Math.max(0, seconds)).padStart(2, '0');
        }

        if (distance < 0) {
            clearInterval(countdownInterval);
            const countdownTitle = document.getElementById("countdown-timer")?.querySelector('h2');
            if (countdownTitle) {
                countdownTitle.textContent = "Pendaftaran TELAH DITUTUP";
            }
            checkScheduleStatus(); 
        }
    };

    updateCountdown(); 
    const countdownInterval = setInterval(updateCountdown, 1000);
}

// ------------------
// 6. Fade In Animation Logic (Full Delay maintained)
// ------------------
export function setupFadeIn() {
    const fadeInElements = document.querySelectorAll('.fade-in-content');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                let delay = 0;
                if (entry.target.classList.contains('delay-100')) delay = 50;
                else if (entry.target.classList.contains('delay-200')) delay = 100;
                else if (entry.target.classList.contains('delay-300')) delay = 150;
                else if (entry.target.classList.contains('delay-400')) delay = 200;
                else if (entry.target.classList.contains('delay-500')) delay = 250;
                else if (entry.target.classList.contains('delay-600')) delay = 300;
                else if (entry.target.classList.contains('delay-700')) delay = 350;

                setTimeout(() => {
                    entry.target.classList.add('visible'); 
                    observer.unobserve(entry.target);
                }, delay);
            }
        });
    }, { threshold: 0.1 });

    fadeInElements.forEach(element => {
        observer.observe(element);
    });
}

// ------------------
// 7. Schedule Status Check (Timeline 5-6 Feb 2026)
// ------------------
const timelineEvents = [
    { id: 'status-pendaftaran', date: new Date(2026, 0, 24, 23, 59, 59) }, 
    { id: 'date-2026-02-04', date: new Date(2026, 0, 25) }, // Technical Meeting
    { id: 'date-2026-02-05', date: new Date(2026, 1, 5) }, // Hari 1
    { id: 'date-2026-02-06', date: new Date(2026, 1, 6) }, // Hari 2
];

export function checkScheduleStatus() {
    const now = new Date();
    const isSameDay = (date1, date2) => {
        return date1.getFullYear() === date2.getFullYear() &&
               date1.getMonth() === date2.getMonth() &&
               date1.getDate() === date2.getDate();
    };

    timelineEvents.forEach(item => {
        const statusElement = document.getElementById(item.id);
        if (statusElement) {
            statusElement.classList.remove('bg-red-500', 'bg-green-500', 'bg-blue-500', 'dark:bg-red-500', 'dark:bg-green-500', 'dark:bg-blue-500', 'bg-gray-400', 'dark:bg-gray-600'); 

            if (item.id === 'status-pendaftaran') {
                if (now < item.date) { 
                    statusElement.classList.add('bg-green-500', 'dark:bg-green-500'); 
                } else {
                    statusElement.classList.add('bg-gray-400', 'dark:bg-gray-600');
                }
            } else {
                if (isSameDay(now, item.date)) {
                    statusElement.classList.add('bg-blue-500', 'dark:bg-blue-500'); 
                } else if (now > item.date) {
                    statusElement.classList.add('bg-red-500', 'dark:bg-red-500'); 
                } else {
                    statusElement.classList.add('bg-gray-400', 'dark:bg-gray-600'); 
                }
            }
        }
    });
}