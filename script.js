
const hotelDB = [
    { name: "فندق فورسيزونز نايل بلازا", city: "القاهرة", price: 7200, img: "https://images.unsplash.com/photo-1541971875076-8f970d573be6", desc: "إقامة ملكية في قلب القاهرة تطل على النيل مباشرة.", rating: "⭐⭐⭐⭐⭐" },
    { name: "فندق ماريوت مينا هاوس", city: "الجيزة", price: 5500, img: "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368", desc: "استيقظ على منظر الأهرامات العظيمة مباشرة من غرفتك.", rating: "⭐⭐⭐⭐⭐" },
    { name: "فورسيزونز الإسكندرية", city: "الإسكندرية", price: 4800, img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4", desc: "أرقى فنادق عروس البحر المتوسط في منطقة سان ستيفانو.", rating: "⭐⭐⭐⭐⭐" },
    { name: "ريكسوس بريميوم سيجيت", city: "شرم الشيخ", price: 6200, img: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9", desc: "رفاهية لا حدود لها وشواطئ خاصة بنظام الكل شامل.", rating: "⭐⭐⭐⭐⭐" },
    { name: "شتيجنبرجر ألدو هاو", city: "الغردقة", price: 3900, img: "https://images.unsplash.com/photo-1566073771259-6a8506099945", desc: "يضم أكبر حمامات السباحة والخدمات الفندقية المميزة.", rating: "⭐⭐⭐⭐⭐" },
    { name: "فندق قيصر باي", city: "مرسى مطروح", price: 3400, img: "https://images.unsplash.com/photo-1544124499-58912cbddaad", desc: "استمتع بمياه مطروح الفيروزية الساحرة.", rating: "⭐⭐⭐⭐" },
    { name: "ريكسوس العلمين", city: "الساحل الشمالي", price: 8500, img: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6", desc: "وجهة الصفوة في الساحل الشمالي المصري.", rating: "⭐⭐⭐⭐⭐" },
    { name: "وينتر بالاس الأقصر", city: "الأقصر", price: 4200, img: "https://images.unsplash.com/photo-1564501049412-61c2a3083791", desc: "فندق تاريخي استضاف الملوك والملكات على مر السنين.", rating: "⭐⭐⭐⭐⭐" },
    { name: "أولد كاتاكت أسوان", city: "أسوان", price: 7500, img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b", desc: "الفندق الأكثر شهرة في أسوان بإطلالة على النيل والآثار.", rating: "⭐⭐⭐⭐⭐" },
    { name: "موفنبيك العين السخنة", city: "العين السخنة", price: 3100, img: "https://images.unsplash.com/photo-1512918766674-ed62b90eaa9c", desc: "أقرب شاطئ للقاهرة بخدمة فندقية ممتازة.", rating: "⭐⭐⭐⭐" },
    { name: "أدرير أميلال سيوة", city: "سيوة", price: 6000, img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e", desc: "فندق بيئي فريد من نوعه وسط رمال سيوة الساحرة.", rating: "⭐⭐⭐⭐⭐" },
    { name: "بورسعيد أوتيل", city: "بورسعيد", price: 2200, img: "https://images.unsplash.com/photo-1566073771259-6a8506099945", desc: "إطلالة مباشرة على مدخل قناة السويس.", rating: "⭐⭐⭐⭐" }
];

let selectedHotel = null;

// عرض الفنادق
function renderHotels(list) {
    const grid = document.getElementById('hotelsGrid');
    grid.innerHTML = list.map(h => `
        <div class="card">
            <img src="${h.img}?w=500" alt="${h.name}">
            <div class="card-body">
                <h3>${h.name}</h3>
                <p>📍 ${h.city}</p>
                <p class="price-tag">${h.price} ج.م / ليلة</p>
                <button class="action-btn" onclick="showDetails('${h.name}')">عرض التفاصيل والوصف</button>
            </div>
        </div>
    `).join('');
}

// بحث وفلتر
function filterHotels() {
    const city = document.getElementById('cityFilter').value;
    const filtered = city === "all" ? hotelDB : hotelDB.filter(h => h.city === city);
    renderHotels(filtered);
    document.getElementById('resultsTitle').innerText = city === "all" ? "عروض شركة إيزي بوكينج" : `فنادق في ${city}`;
}

// فتح التفاصيل
function showDetails(name) {
    selectedHotel = hotelDB.find(h => h.name === name);
    document.getElementById('detImg').src = selectedHotel.img + "?w=600";
    document.getElementById('detName').innerText = selectedHotel.name;
    document.getElementById('detDesc').innerText = selectedHotel.desc;
    document.getElementById('detRating').innerText = selectedHotel.rating;
    document.getElementById('detailsModal').style.display = 'flex';
    document.getElementById('startBooking').onclick = () => {
        closeModal('detailsModal');
        openBookingModal();
    };
}

function openBookingModal() {
    document.getElementById('bookingHotelName').innerText = "حجز " + selectedHotel.name;
    document.getElementById('bookingModal').style.display = 'flex';
}

function closeModal(id) { document.getElementById(id).style.display = 'none'; }

// حساب السعر
function calcTotal() {
    const d1 = new Date(document.getElementById('checkIn').value);
    const d2 = new Date(document.getElementById('checkOut').value);
    const display = document.getElementById('priceDisplay');
    
    if(d1 && d2 && d2 > d1) {
        const nights = Math.ceil((d2 - d1) / (1000 * 60 * 60 * 24));
        const total = nights * selectedHotel.price;
        display.innerHTML = `عدد الليالي: ${nights} | الإجمالي: <b style="color:red">${total} ج.م</b>`;
        return total;
    }
    display.innerText = "يرجى اختيار التواريخ لحساب المبلغ...";
    return 0;
}

function nextStep() {
    if(document.getElementById('custName').value && calcTotal() > 0) {
        document.getElementById('step1').style.display = 'none';
        document.getElementById('step2').style.display = 'block';
    } else { alert("يرجى ملء كافة البيانات واختيار التواريخ"); }
}

function prevStep() {
    document.getElementById('step1').style.display = 'block';
    document.getElementById('step2').style.display = 'none';
}

// إتمام الحجز
function finalizeBooking() {
    const pay = document.querySelector('input[name="pay"]:checked').value;
    const orderID = "EB-" + Math.floor(Math.random() * 100000);
    const order = {
        id: orderID,
        hotel: selectedHotel.name,
        customer: document.getElementById('custName').value,
        phone: document.getElementById('custPhone').value,
        total: calcTotal(),
        method: pay,
        status: "مدفوع بالكامل ✅"
    };

    let db = JSON.parse(localStorage.getItem('ebOrders')) || [];
    db.push(order);
    localStorage.setItem('ebOrders', JSON.stringify(db));

    alert(`تم تأكيد حجزك بنجاح عبر شركة إيزي بوكينج!\nرقم الطلب: ${orderID}\nطريقة الدفع: ${pay}`);
    location.reload();
}

window.onload = () => {
    // تشغيل دالة عرض الفنادق الأصلية
    renderHotels(hotelDB);

    // كود إخفاء شاشة التحميل
    const loader = document.getElementById('loader');
    
    // سننتظر ثانية إضافية بعد التحميل ليعطي شكل جمالي
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 2000); // 2000 تعني ثانيتين
};
