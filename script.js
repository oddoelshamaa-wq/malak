// بيانات الفنادق في مصر
const hotels = [
    {
        name: "فندق فورسيزونز نايل بلازا",
        city: "cairo",
        price: "6200",
        img: "https://images.unsplash.com/photo-1541971875076-8f970d573be6?w=500",
        desc: "إطلالة بانورامية على نيل القاهرة العظيم."
    },
    {
        name: "منتجع ريكسوس باب البحر",
        city: "sharm",
        price: "4800",
        img: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=500",
        desc: "شامل كلياً، أفضل شواطئ شرم الشيخ."
    },
    {
        name: "فندق شتاينبرجر الجونة",
        city: "gouna",
        price: "3900",
        img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=500",
        desc: "هدوء ورفاهية في قلب مدينة الجونة."
    },
    {
        name: "فندق ماريوت الإسكندرية",
        city: "alex",
        price: "2500",
        img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=500",
        desc: "عبق التاريخ مع إطلالة البحر المتوسط."
    },
    {
        name: "قصر لوسيان - الأقصر",
        city: "luxor",
        price: "3200",
        img: "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?w=500",
        desc: "إقامة وسط الآثار المصرية القديمة."
    }
];

// دالة لعرض الفنادق
function displayHotels(data) {
    const grid = document.getElementById('hotelsGrid');
    grid.innerHTML = "";

    data.forEach(hotel => {
        const hotelNameEncoded = encodeURIComponent(hotel.name);
        const waLink = `https://wa.me/201234567890?text=أريد_الاستفسار_عن_حجز_في_${hotelNameEncoded}`;

        const card = `
            <div class="hotel-card" onmousemove="tilt(event, this)" onmouseleave="resetTilt(this)">
                <img src="${hotel.img}" alt="${hotel.name}">
                <div class="hotel-info">
                    <h3>${hotel.name}</h3>
                    <p>${hotel.desc}</p>
                    <span class="price">${hotel.price} ج.م / ليلة</span>
                    <a href="${waLink}" target="_blank" class="whatsapp-btn">احجز عبر واتساب</a>
                </div>
            </div>
        `;
        grid.innerHTML += card;
    });
}

// دالة البحث والفلترة
function filterHotels() {
    const selectedCity = document.getElementById('citySelect').value;
    if (selectedCity === "all") {
        displayHotels(hotels);
    } else {
        const filtered = hotels.filter(h => h.city === selectedCity);
        displayHotels(filtered);
    }
}

// تأثير الـ 3D (Tilt Effect)
function tilt(e, card) {
    const cardRect = card.getBoundingClientRect();
    const x = e.clientX - cardRect.left;
    const y = e.clientY - cardRect.top;
    
    const centerX = cardRect.width / 2;
    const centerY = cardRect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
}

function resetTilt(card) {
    card.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`;
}

// عرض كل الفنادق عند فتح الموقع لأول مرة
window.onload = () => displayHotels(hotels);
