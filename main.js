// Fallback jika SweetAlert2 gagal dimuat dari CDN
if (typeof Swal === "undefined") {
    window.Swal = {
        fire: function(options) {
            alert(options.title + (options.text ? "\n" + options.text : ""));
            return Promise.resolve({ isConfirmed: true });
        },
        mixin: function() {
            return {
                fire: function(options) {
                    console.log("Toast:", options.title);
                }
            };
        }
    };
}

// URL Google Apps Script Web App
const API_URL = "https://script.google.com/macros/s/AKfycbz0MFal--q_Mfs3Wl3g1rrVVvZFwhIwvtTOgfoU480k0zv4jzEtj2WmoM8V23KtMRPQ/exec";

// Database Produk Frozen Food Premium (Bibah Frozen Food) - Data Produk Asli
let PRODUCTS_DB = [
    // === NUGGET ===
    {
        id: "yona-crispy-nuggets",
        nama: "Yona Crispy Chicken Nuggets",
        kategori: "nugget_sosis",
        deskripsi: "Nugget ayam krispi renyah dari Yona, cocok untuk lauk dan camilan keluarga.",
        harga: 36000,
        berat: "500g",
        gambar: "produk/yona-crispy-chicken-nuggets.webp",
        badge: "Terlaris"
    },
    {
        id: "asimo-naget-ayam",
        nama: "Asimo Naget Ayam",
        kategori: "nugget_sosis",
        deskripsi: "Chicken nugget Asimo 500g, bertekstur lembut di dalam dan renyah di luar.",
        harga: 27000,
        berat: "500g",
        gambar: "produk/asimo-naget-ayam.webp",
        badge: ""
    },
    {
        id: "oye-klasik-naget",
        nama: "Oye Klasik Naget Ayam",
        kategori: "nugget_sosis",
        deskripsi: "Naget ayam klasik Oye, asli dagingnya mantab rasanya. Sudah dimasak, tinggal goreng.",
        harga: 30000,
        berat: "500g",
        gambar: "produk/oye-klasik-naget-ayam.webp",
        badge: ""
    },
    {
        id: "kanzler-crispy-stick",
        nama: "Kanzler Crispy Chicken Nugget Stick",
        kategori: "nugget_sosis",
        deskripsi: "Nugget ayam crispy bentuk stik dari Kanzler, extra meaty dengan bubble crumb premium.",
        harga: 45000,
        berat: "450g",
        gambar: "produk/kanzler-crispy-chicken-nugget-stick.webp",
        badge: "Premium"
    },
    {
        id: "hemato-naget-kombinasi",
        nama: "Hemato Naget Ayam Kombinasi Reguler",
        kategori: "nugget_sosis",
        deskripsi: "Naget ayam kombinasi reguler dari Hemato, pilihan hemat untuk keluarga.",
        harga: 25000,
        berat: "500g",
        gambar: "produk/hemato-naget-ayam-kombinasi.webp",
        badge: ""
    },
    {
        id: "richeese-naget-bubble",
        nama: "Richeese Factory Naget Ayam Bubble Crumb",
        kategori: "nugget_sosis",
        deskripsi: "Naget ayam crispy bubble crumb dari Richeese Factory, daging ayam pilihan harga ekonomis.",
        harga: 32000,
        berat: "450g",
        gambar: "produk/richeese-naget-ayam-bubble-crumb.webp",
        badge: "Rekomendasi"
    },
    {
        id: "salam-chicken-nugget",
        nama: "Salam Chicken Nugget",
        kategori: "nugget_sosis",
        deskripsi: "Naget ayam kombinasi dari PBS Salam, renyah dan gurih cocok untuk segala usia.",
        harga: 26000,
        berat: "500g",
        gambar: "produk/salam-chicken-nugget.webp",
        badge: ""
    },
    {
        id: "hemato-naget-ayam",
        nama: "Hemato Naget Ayam",
        kategori: "nugget_sosis",
        deskripsi: "Naget ayam klasik Hemato, renyah di luar lembut di dalam. Simpan beku -12\u00B0C.",
        harga: 28000,
        berat: "500g",
        gambar: "produk/hemato-naget-ayam.webp",
        badge: ""
    },
    {
        id: "fiesta-crispy-bubble",
        nama: "Fiesta Crispy Bubble",
        kategori: "nugget_sosis",
        deskripsi: "Naget ayam krispi bubble crumb dari Fiesta, extra meaty maximum crispiness.",
        harga: 38000,
        berat: "400g",
        gambar: "produk/fiesta-crispy-bubble.webp",
        badge: "Terfavorit"
    },
    {
        id: "fiesta-chicken-nugget",
        nama: "Fiesta Chicken Nugget",
        kategori: "nugget_sosis",
        deskripsi: "Naget ayam Fiesta signature recipe, extra meaty juicy inside. Siap masak.",
        harga: 37000,
        berat: "400g",
        gambar: "produk/fiesta-chicken-nugget.webp",
        badge: "Terlaris"
    },
    {
        id: "champ-chicken-nugget",
        nama: "Champ Chicken Nugget",
        kategori: "nugget_sosis",
        deskripsi: "Naget ayam kombinasi dari Champ, siap masak dan cocok untuk anak-anak.",
        harga: 35000,
        berat: "450g",
        gambar: "produk/champ-chicken-nugget.webp",
        badge: ""
    },
    {
        id: "kanzler-crispy-nugget",
        nama: "Kanzler Crispy Chicken Nugget",
        kategori: "nugget_sosis",
        deskripsi: "Nugget ayam crispy premium Kanzler dengan bubble crumb coating, extra meaty.",
        harga: 44000,
        berat: "450g",
        gambar: "produk/kanzler-crispy-chicken-nugget.webp",
        badge: "Premium"
    },
    {
        id: "kanzler-nugget-spicy",
        nama: "Kanzler Crispy Chicken Nugget Spicy",
        kategori: "nugget_sosis",
        deskripsi: "Nugget ayam crispy pedas Kanzler dengan bubble crumb, sensasi spicy menggigit!",
        harga: 45000,
        berat: "450g",
        gambar: "produk/kanzler-crispy-chicken-nugget-spicy.webp",
        badge: "Pedas"
    },
    {
        id: "kanzler-nugget-original",
        nama: "Kanzler Chicken Nugget Original",
        kategori: "nugget_sosis",
        deskripsi: "Nugget ayam original Kanzler premium quality, extra meaty extra 3 pcs!",
        harga: 46000,
        berat: "450g",
        gambar: "produk/kanzler-chicken-nugget-original.webp",
        badge: "Premium"
    },
    {
        id: "uenaaak-nugget-coin",
        nama: "Uenaaak Nugget Coin by Belfoods",
        kategori: "nugget_sosis",
        deskripsi: "Naget ayam kombinasi bentuk koin dari Belfoods, daging ayam pilihan rasa lebih uenaaak!",
        harga: 29000,
        berat: "500g",
        gambar: "produk/uenaaak-nugget-coin.webp",
        badge: ""
    },
    {
        id: "hemato-naget-mix",
        nama: "Hemato Naget Ayam Kombinasi Mix",
        kategori: "nugget_sosis",
        deskripsi: "Naget ayam kombinasi bentuk mix dari Hemato, berbagai bentuk dalam satu kemasan.",
        harga: 26000,
        berat: "500g",
        gambar: "produk/hemato-naget-ayam-kombinasi-mix.webp",
        badge: ""
    },
    {
        id: "okey-naget-ayam",
        nama: "Okey Naget Ayam",
        kategori: "nugget_sosis",
        deskripsi: "Naget ayam kombinasi dari Okey, simpan beku keep frozen -18\u00B0C.",
        harga: 24000,
        berat: "500g",
        gambar: "produk/okey-naget-ayam.webp",
        badge: ""
    },
    // === NUGGET STIK ===
    {
        id: "oye-stik-naget",
        nama: "Oye Stik Naget Ayam",
        kategori: "nugget_sosis",
        deskripsi: "Naget ayam bentuk stik dari Oye, asli dagingnya mantab rasanya. Sudah dimasak.",
        harga: 31000,
        berat: "500g",
        gambar: "produk/oye-stik-naget-ayam.webp",
        badge: ""
    },
    {
        id: "okey-stik-naget",
        nama: "Okey Stik Naget Ayam",
        kategori: "nugget_sosis",
        deskripsi: "Naget ayam kombinasi bentuk stik dari Okey, simpan beku -18\u00B0C.",
        harga: 25000,
        berat: "500g",
        gambar: "produk/okey-stik-naget-ayam.webp",
        badge: ""
    },
    {
        id: "fiesta-stikie",
        nama: "Fiesta Stikie Naget Ayam",
        kategori: "nugget_sosis",
        deskripsi: "Naget ayam bentuk stik dari Fiesta, crunchy outside juicy inside extra meaty.",
        harga: 37000,
        berat: "400g",
        gambar: "produk/fiesta-stikie.webp",
        badge: ""
    },
    {
        id: "champ-nugget-stick",
        nama: "Champ Chicken Nugget Stick",
        kategori: "nugget_sosis",
        deskripsi: "Naget ayam kombinasi bentuk stik dari Champ, siap masak simpan beku -18\u00B0C.",
        harga: 34000,
        berat: "450g",
        gambar: "produk/champ-chicken-nugget-stick.webp",
        badge: ""
    },
    // === NUGGET ANAK ===
    {
        id: "fiesta-nugget-pizzabo",
        nama: "Fiesta Nugget Pizzabo ABC",
        kategori: "kentang_camilan",
        deskripsi: "Naget ayam bentuk huruf ABC rasa pizza dari Fiesta, favorit anak-anak!",
        harga: 36000,
        berat: "400g",
        gambar: "produk/fiesta-nugget-pizzabo.webp",
        badge: "Kids"
    },
    {
        id: "oye-funny-naget",
        nama: "Oye Funny Naget Ayam",
        kategori: "kentang_camilan",
        deskripsi: "Naget ayam bentuk lucu dari Oye, mantab rasanya cocok untuk camilan anak.",
        harga: 30000,
        berat: "500g",
        gambar: "produk/oye-funny-naget-ayam.webp",
        badge: "Kids"
    },
    {
        id: "champ-nugget-abc",
        nama: "Champ Chicken Nugget ABC",
        kategori: "kentang_camilan",
        deskripsi: "Naget ayam kombinasi bentuk abjad ABC dari Champ, siap masak favorit si kecil!",
        harga: 34000,
        berat: "450g",
        gambar: "produk/champ-chicken-nugget-abc.webp",
        badge: "Kids"
    },
    {
        id: "fiesta-nugget-dino",
        nama: "Fiesta Nugget Dino",
        kategori: "kentang_camilan",
        deskripsi: "Naget ayam bentuk dinosaurus lucu dari Fiesta, cute dino shape yummy!",
        harga: 36000,
        berat: "400g",
        gambar: "produk/fiesta-nugget-dino.webp",
        badge: "Kids"
    },
    {
        id: "oye-koin-naget",
        nama: "Oye Koin Naget Ayam",
        kategori: "kentang_camilan",
        deskripsi: "Naget ayam bentuk koin lucu dari Oye, asli dagingnya mantab rasanya.",
        harga: 30000,
        berat: "500g",
        gambar: "produk/oye-koin-naget-ayam.webp",
        badge: "Kids"
    },
    {
        id: "champ-crunchy-nugget",
        nama: "Champ Crunchy Nugget",
        kategori: "nugget_sosis",
        deskripsi: "Naget ayam kombinasi renyah dari Champ edisi BoBoiBoy, simpan beku -18\u00B0C.",
        harga: 35000,
        berat: "450g",
        gambar: "produk/champ-crunchy-nugget.webp",
        badge: ""
    },
    // === AYAM OLAHAN ===
    {
        id: "fiesta-pok-pok",
        nama: "Fiesta Pok-Pok",
        kategori: "bakso_dimsum",
        deskripsi: "Daging ayam olahan bite-size dari Fiesta, great taste siap masak ready to cook.",
        harga: 35000,
        berat: "400g",
        gambar: "produk/fiesta-pok-pok.webp",
        badge: "Rekomendasi"
    },
    {
        id: "fiesta-spicy-wing",
        nama: "Fiesta Spicy Wing",
        kategori: "bakso_dimsum",
        deskripsi: "Sayap ayam dengan bumbu pedas dari Fiesta, selected seasoning juicy inside.",
        harga: 40000,
        berat: "400g",
        gambar: "produk/fiesta-spicy-wing.webp",
        badge: "Pedas"
    },
    {
        id: "fiesta-crispy-crunch",
        nama: "Fiesta Crispy Crunch",
        kategori: "bakso_dimsum",
        deskripsi: "Kulit ayam goreng crispy crunch dari Fiesta, tasty snack flavorful!",
        harga: 30000,
        berat: "300g",
        gambar: "produk/fiesta-crispy-crunch.webp",
        badge: ""
    },
    {
        id: "fiesta-spicy-chick",
        nama: "Fiesta Spicy Chick",
        kategori: "bakso_dimsum",
        deskripsi: "Daging ayam dengan bumbu pedas spesial dari Fiesta, specially seasoned juicy inside.",
        harga: 38000,
        berat: "400g",
        gambar: "produk/fiesta-spicy-chick.webp",
        badge: "Pedas"
    },
    {
        id: "fiesta-karage",
        nama: "Fiesta Karage",
        kategori: "bakso_dimsum",
        deskripsi: "Daging paha ayam karage renyah ala Jepang dari Fiesta, juicy inside crunchy outside.",
        harga: 39000,
        berat: "400g",
        gambar: "produk/fiesta-karage.webp",
        badge: "Terfavorit"
    }
];

// Mock Database Riwayat Transaksi Lokal (Fallback jika database kosong / error)
const MOCK_RIWAYAT_DB = [
    {
        timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
        id_invoice: "BBF-48201948",
        nama: "Dewi Lestari",
        layanan: "Chicken Nugget Bubble Crumb (2x), French Fries (1x)",
        metode: "Kurir Toko",
        total: 105000
    },
    {
        timestamp: new Date(Date.now() - 3600000 * 5).toISOString(),
        id_invoice: "BBF-19402839",
        nama: "Budi Santoso",
        layanan: "Smoked Beef Sausage (1x), Bakso Sapi Urat (2x)",
        metode: "Ambil Sendiri",
        total: 112000
    },
    {
        timestamp: new Date(Date.now() - 86400000 * 1).toISOString(),
        id_invoice: "BBF-84029481",
        nama: "Anita Wijaya",
        layanan: "Dimsum Ayam Mentai (3x)",
        metode: "Kurir Toko",
        total: 94000
    }
];

// State Database Riwayat Transaksi Live
let riwayatTransaksi = [];
let riwayatCurrentPage = 1;
const riwayatItemsPerPage = 5;

const ADMIN_WA = "6281575884184"; // WhatsApp Admin Toko

// SweetAlert2 Red Toast Mixin
const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
});

function swalWarning(title, text) {
    return Swal.fire({
        icon: "warning",
        title: title,
        text: text || "",
        confirmButtonText: "Oke",
        confirmButtonColor: "#dc2626",
    });
}

function escapeHTML(str) {
    if (!str) return "";
    return str
        .toString()
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// Helper untuk mengambil properti objek secara case-insensitive
function getCaseInsensitive(obj, key) {
    if (!obj) return undefined;
    const lowerKey = key.toLowerCase();
    for (let k in obj) {
        if (k.toLowerCase() === lowerKey) return obj[k];
    }
    return undefined;
}

// --- RENDER KATALOG PRODUK ---
var targetKategori = 'semua';

function renderProducts() {
    var grid = document.getElementById("product-grid");
    if (!grid) return;

    var searchQuery = document.getElementById("search-input") ? document.getElementById("search-input").value.toLowerCase().trim() : "";
    var filtered = PRODUCTS_DB.filter(function (prod) {
        var matchKat = (targetKategori === 'semua' || prod.kategori === targetKategori);
        var matchSearch = (prod.nama.toLowerCase().indexOf(searchQuery) !== -1 || (prod.deskripsi && prod.deskripsi.toLowerCase().indexOf(searchQuery) !== -1));
        return matchKat && matchSearch;
    });

    var emptyState = document.getElementById("no-products-found");
    if (filtered.length === 0) {
        grid.innerHTML = "";
        if (emptyState) emptyState.classList.remove("hidden");
        return;
    }

    if (emptyState) emptyState.classList.add("hidden");

    var html = "";
    filtered.forEach(function (prod) {
        var badgeHtml = prod.badge 
            ? `<span class="absolute top-4 left-4 bg-redBrand text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md z-10">${prod.badge}</span>` 
            : "";

        var deskripsiText = prod.deskripsi || prod.text_deskripsi || "";

        html += `
        <div class="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden transform hover:-translate-y-2 transition duration-300 product-card flex flex-col justify-between relative">
            ${badgeHtml}
            <div class="relative group overflow-hidden h-48 bg-slate-50 flex items-center justify-center">
                <img src="${prod.gambar}" alt="${escapeHTML(prod.nama)}" class="w-full h-full object-cover group-hover:scale-110 transition duration-500" onerror="this.src='https://via.placeholder.com/300x200?text=Frozen+Food'">
                <span class="absolute bottom-4 right-4 bg-slate-900/70 backdrop-blur-md text-white text-xs font-bold px-2.5 py-1 rounded-lg">${prod.berat}</span>
            </div>
            <div class="p-5 flex-grow flex flex-col justify-between">
                <div class="mb-4">
                    <h4 class="font-extrabold text-slate-800 text-base sm:text-lg mb-1 leading-snug">${escapeHTML(prod.nama)}</h4>
                    <p class="text-slate-400 text-xs font-medium leading-relaxed">${escapeHTML(deskripsiText)}</p>
                </div>
                <div class="flex items-center justify-between mt-auto pt-3 border-t border-slate-50">
                    <span class="text-lg font-black text-slate-900">Rp ${prod.harga.toLocaleString("id-ID")}</span>
                    <button onclick="tambahKeKeranjang('${prod.id}')" class="px-4 py-2 bg-redBrand hover:bg-redDark text-white font-bold text-xs rounded-xl shadow-md transition duration-200 flex items-center gap-1.5 active:scale-95">
                        <i class="fas fa-cart-plus"></i> Beli
                    </button>
                </div>
            </div>
        </div>`;
    });
    grid.innerHTML = html;
}

window.filterKategoriProduk = function (kategori, button) {
    targetKategori = kategori;
    
    var btns = document.querySelectorAll("#tab-filter-container button");
    btns.forEach(function (btn) {
        btn.className = "px-6 py-3 bg-white text-slate-600 hover:text-slate-900 rounded-2xl font-bold text-sm shadow-sm transition duration-300 border border-slate-100";
    });
    button.className = "px-6 py-3 bg-redBrand text-white rounded-2xl font-bold text-sm shadow-md transition duration-300";
    
    renderProducts();
};

window.filterCariProduk = function () {
    renderProducts();
};

// --- LOGIKA KERANJANG BELANJA ---
var cart = [];
var appliedPromoCode = "";
var diskonNominal = 0;

function loadCart() {
    var savedCart = localStorage.getItem("bibahFrozenCartRed");
    var savedPromo = localStorage.getItem("bibahFrozenPromoRed");
    
    if (savedCart) {
        try {
            cart = JSON.parse(savedCart);
        } catch (e) {
            cart = [];
        }
    }
    if (savedPromo) {
        appliedPromoCode = savedPromo;
    }
    renderCart();
}

function saveCart() {
    localStorage.setItem("bibahFrozenCartRed", JSON.stringify(cart));
    localStorage.setItem("bibahFrozenPromoRed", appliedPromoCode);
    renderCart();
}

window.tambahKeKeranjang = function (productId) {
    var prod = PRODUCTS_DB.find(function (p) {
        return p.id === productId;
    });
    if (!prod) return;

    var existingItem = cart.find(function (item) {
        return item.id === productId;
    });

    if (existingItem) {
        existingItem.jumlah += 1;
    } else {
        cart.push({
            id: prod.id,
            nama: prod.nama,
            harga: prod.harga,
            jumlah: 1,
            berat: prod.berat,
            gambar: prod.gambar
        });
    }
    saveCart();

    Toast.fire({
        icon: "success",
        title: `❤️ <strong>${escapeHTML(prod.nama)}</strong> masuk keranjang!`,
    });
};

window.updateJumlahItem = function (index, change) {
    var item = cart[index];
    var newJumlah = item.jumlah + change;
    
    if (newJumlah <= 0) {
        cart.splice(index, 1);
        Toast.fire({ icon: "info", title: "Item dihapus dari keranjang" });
    } else {
        item.jumlah = newJumlah;
    }
    saveCart();
};

window.hapusItem = function (index) {
    var namaItem = cart[index] ? cart[index].nama : "Item";
    cart.splice(index, 1);
    saveCart();
    Toast.fire({
        icon: "info",
        title: `🗑️ ${escapeHTML(namaItem)} dihapus`,
    });
};

function renderCart() {
    var cartContainer = document.getElementById("cart-items");
    var cartCount = document.getElementById("cart-count");
    var totalSpan = document.getElementById("cart-total");
    var subtotalSpan = document.getElementById("summary-subtotal");
    var ongkirRow = document.getElementById("summary-ongkir-row");
    var ongkirSpan = document.getElementById("summary-ongkir");
    var diskonRow = document.getElementById("summary-diskon-row");
    var diskonSpan = document.getElementById("summary-diskon");
    var diskonCodeSpan = document.getElementById("summary-diskon-code");
    var metodeSelect = document.getElementById("checkout-metode");

    if (!cartContainer) return;

    if (cart.length === 0) {
        cartContainer.innerHTML = '<div class="text-center text-slate-400 py-16 text-sm">Keranjang belanja Anda masih kosong. Mari isi dengan frozen food lezat!</div>';
        if (totalSpan) totalSpan.innerText = "Rp 0";
        if (subtotalSpan) subtotalSpan.innerText = "Rp 0";
        if (cartCount) cartCount.innerText = "0 Item";
        if (ongkirRow) ongkirRow.classList.add("hidden");
        if (diskonRow) diskonRow.classList.add("hidden");
        return;
    }

    var subtotal = 0;
    var totalItems = 0;
    var html = "";

    cart.forEach(function (item, index) {
        var itemSubtotal = item.harga * item.jumlah;
        subtotal += itemSubtotal;
        totalItems += item.jumlah;

        html += `
        <div class="flex items-center justify-between border-b border-slate-100 py-4 gap-4">
            <img src="${item.gambar}" alt="${escapeHTML(item.nama)}" class="w-12 h-12 rounded-xl object-cover bg-slate-100 hidden sm:block">
            <div class="flex-1">
                <h5 class="font-bold text-slate-800 text-sm">${escapeHTML(item.nama)}</h5>
                <p class="text-xs text-slate-400">Rp ${item.harga.toLocaleString("id-ID")} (${item.berat})</p>
            </div>
            <div class="flex items-center gap-2">
                <button type="button" onclick="updateJumlahItem(${index}, -1)" class="w-7 h-7 rounded-lg bg-redLight text-redBrand hover:bg-redBrand hover:text-white transition flex items-center justify-center font-bold text-xs">-</button>
                <span class="w-8 text-center font-bold text-slate-700 text-xs">${item.jumlah}</span>
                <button type="button" onclick="updateJumlahItem(${index}, 1)" class="w-7 h-7 rounded-lg bg-redLight text-redBrand hover:bg-redBrand hover:text-white transition flex items-center justify-center font-bold text-xs">+</button>
                <button type="button" onclick="hapusItem(${index})" class="text-redBrand/60 hover:text-redBrand transition p-1"><i class="fas fa-trash-alt text-xs"></i></button>
            </div>
            <div class="text-right min-w-[80px]">
                <span class="font-extrabold text-slate-800 text-sm">Rp ${itemSubtotal.toLocaleString("id-ID")}</span>
            </div>
        </div>`;
    });

    cartContainer.innerHTML = html;
    if (cartCount) cartCount.innerText = totalItems + " Item";
    if (subtotalSpan) subtotalSpan.innerText = "Rp " + subtotal.toLocaleString("id-ID");

    // Hitung Biaya Pengiriman
    var ongkir = 0;
    if (metodeSelect && metodeSelect.value === "Kurir Toko") {
        ongkir = 10000;
        if (ongkirRow) ongkirRow.classList.remove("hidden");
    } else {
        if (ongkirRow) ongkirRow.classList.add("hidden");
    }

    // Hitung Diskon Promo
    diskonNominal = 0;
    var promoStatus = document.getElementById("promo-status");
    
    if (appliedPromoCode) {
        if (appliedPromoCode === "FROZENMANTAP") {
            diskonNominal = Math.round(subtotal * 0.1); // Diskon 10%
            if (diskonRow) {
                diskonRow.classList.remove("hidden");
                diskonSpan.innerText = diskonNominal.toLocaleString("id-ID");
                diskonCodeSpan.innerText = "FROZENMANTAP 10%";
            }
            if (promoStatus) {
                promoStatus.innerHTML = `<span class="text-emerald-600 font-bold"><i class="fas fa-check-circle"></i> Voucher <strong>FROZENMANTAP</strong> (Diskon 10%) aktif!</span>`;
            }
        } else if (appliedPromoCode === "FREEONGKIR") {
            if (metodeSelect && metodeSelect.value === "Kurir Toko") {
                diskonNominal = 10000; // Free Ongkir (maksimal Rp 10.000)
                if (diskonRow) {
                    diskonRow.classList.remove("hidden");
                    diskonSpan.innerText = diskonNominal.toLocaleString("id-ID");
                    diskonCodeSpan.innerText = "FREEONGKIR";
                }
                if (promoStatus) {
                    promoStatus.innerHTML = `<span class="text-emerald-600 font-bold"><i class="fas fa-check-circle"></i> Voucher <strong>FREEONGKIR</strong> aktif!</span>`;
                }
            } else {
                if (diskonRow) diskonRow.classList.add("hidden");
                if (promoStatus) {
                    promoStatus.innerHTML = `<span class="text-amber-600 font-bold"><i class="fas fa-exclamation-triangle"></i> Voucher <strong>FREEONGKIR</strong> hanya untuk Kurir Toko</span>`;
                }
            }
        }
    } else {
        if (diskonRow) diskonRow.classList.add("hidden");
        if (promoStatus) promoStatus.innerHTML = "";
    }

    var totalAkhir = Math.max(0, (subtotal + ongkir) - diskonNominal);
    if (totalSpan) totalSpan.innerText = "Rp " + totalAkhir.toLocaleString("id-ID");
}

window.togglePengirimanLayout = function () {
    var metode = document.getElementById("checkout-metode").value;
    var wrapper = document.getElementById("alamat-wrapper");
    var inputAlamat = document.getElementById("checkout-alamat");
    
    if (metode === "Kurir Toko") {
        wrapper.classList.remove("hidden");
        if (inputAlamat) inputAlamat.required = true;
    } else {
        wrapper.classList.add("hidden");
        if (inputAlamat) {
            inputAlamat.required = false;
            inputAlamat.value = "";
        }
    }
    renderCart();
};

// --- SISTEM KODE PROMO ---
window.prosesTerapkanPromo = function () {
    var promoInput = document.getElementById("promo-input");
    if (!promoInput) return;

    var code = promoInput.value.toUpperCase().trim();
    if (!code) {
        swalWarning("Kode Voucher Kosong!", "Silakan masukkan kode voucher terlebih dahulu.");
        return;
    }

    if (code === "FROZENMANTAP" || code === "FREEONGKIR") {
        appliedPromoCode = code;
        saveCart();
        Toast.fire({
            icon: "success",
            title: `🎟️ Voucher <strong>${code}</strong> berhasil diaktifkan!`,
        });
    } else {
        appliedPromoCode = "";
        saveCart();
        Swal.fire({
            icon: "error",
            title: "Voucher Tidak Valid!",
            text: "Kode voucher salah atau sudah tidak aktif.",
            confirmButtonColor: "#dc2626"
        });
    }
    promoInput.value = "";
};

window.aplikasikanVoucherDanNotif = function (code) {
    appliedPromoCode = code;
    saveCart();
    
    var cartSec = document.getElementById("keranjang");
    if (cartSec) cartSec.scrollIntoView({ behavior: "smooth" });

    Toast.fire({
        icon: "success",
        title: `🎟️ Voucher <strong>${code}</strong> berhasil digunakan!`,
    });
};

// --- ALUR CHECKOUT DI CUSTOM MODAL POP-UP & QRIS OTOMATIS ---
var countdownTimerInterval = null;

window.checkoutPemesanan = async function () {
    if (cart.length === 0) {
        await swalWarning("Keranjang Kosong!", "Silakan pilih produk frozen food favorit Anda terlebih dahulu.");
        return;
    }

    var nama = document.getElementById("checkout-nama").value.trim();
    var wa = document.getElementById("checkout-wa").value.trim();
    var metode = document.getElementById("checkout-metode").value;
    var alamat = document.getElementById("checkout-alamat").value.trim() || "Ambil Sendiri di Outlet";
    var catatan = document.getElementById("checkout-catatan").value.trim() || "Tidak ada";

    if (!nama) {
        await swalWarning("Nama Belum Diisi!", "Silakan isi nama Anda untuk pemesanan.");
        document.getElementById("checkout-nama").focus();
        return;
    }
    if (!wa) {
        await swalWarning("WhatsApp Belum Diisi!", "Silakan isi nomor WhatsApp Anda.");
        document.getElementById("checkout-wa").focus();
        return;
    }
    if (metode === "Kurir Toko" && !document.getElementById("checkout-alamat").value.trim()) {
        await swalWarning("Alamat Kosong!", "Mohon isi alamat lengkap pengiriman untuk kurir toko.");
        document.getElementById("checkout-alamat").focus();
        return;
    }

    // Generate Invoice ID
    var invoiceId = "BBF-" + Date.now().toString().slice(-8);

    // Injeksi Data ke Halaman Invoice
    document.getElementById("payment-invoice-id").innerText = invoiceId;
    document.getElementById("invoice-penerima").innerText = nama;
    document.getElementById("invoice-wa").innerText = wa;
    document.getElementById("invoice-metode").innerText = metode;
    document.getElementById("invoice-alamat").innerText = alamat;
    document.getElementById("invoice-catatan").innerText = catatan;

    // Hitung & Injeksi Detail Table
    var subtotal = 0;
    var tbody = document.getElementById("invoice-items-body");
    tbody.innerHTML = "";
    
    cart.forEach(function (item) {
        var itemSubtotal = item.harga * item.jumlah;
        subtotal += itemSubtotal;
        
        var tr = document.createElement("tr");
        tr.className = "border-b border-slate-100 hover:bg-slate-50/50 transition-colors";
        tr.innerHTML = `
            <td class="py-2.5 px-3.5">
                <span class="font-bold text-slate-800 text-xs sm:text-sm">${escapeHTML(item.nama)}</span><br>
                <span class="text-[9px] text-slate-400 font-medium">${item.berat}</span>
            </td>
            <td class="py-2.5 px-3.5 text-center text-slate-800 text-xs sm:text-sm">${item.jumlah}</td>
            <td class="py-2.5 px-3.5 text-right font-bold text-slate-800 text-xs sm:text-sm">Rp ${itemSubtotal.toLocaleString("id-ID")}</td>
        `;
        tbody.appendChild(tr);
    });

    var ongkir = (metode === "Kurir Toko") ? 10000 : 0;
    var totalAkhir = Math.max(0, (subtotal + ongkir) - diskonNominal);

    // Injeksi Detail Harga
    document.getElementById("invoice-subtotal").innerText = "Rp " + subtotal.toLocaleString("id-ID");
    
    var ongkirRow = document.getElementById("invoice-ongkir-row");
    var ongkirSpan = document.getElementById("invoice-ongkir");
    if (ongkir > 0) {
        ongkirRow.classList.remove("hidden");
        ongkirSpan.innerText = "Rp " + ongkir.toLocaleString("id-ID");
    } else {
        ongkirRow.classList.add("hidden");
    }

    var diskonRow = document.getElementById("invoice-diskon-row");
    var diskonSpan = document.getElementById("invoice-diskon");
    var diskonCodeSpan = document.getElementById("invoice-diskon-code");
    if (diskonNominal > 0) {
        diskonRow.classList.remove("hidden");
        diskonSpan.innerText = diskonNominal.toLocaleString("id-ID");
        diskonCodeSpan.innerText = appliedPromoCode;
    } else {
        diskonRow.classList.add("hidden");
    }

    document.getElementById("invoice-total").innerText = "Rp " + totalAkhir.toLocaleString("id-ID");

    // Gunakan gambar QRIS statis yang disediakan
    document.getElementById("payment-qr-image").src = "QRIS.jpeg";

    // Reset Spinner & State Cek Status
    var spinner = document.getElementById("btn-status-spinner");
    if (spinner) spinner.className = "fas fa-check-circle";
    document.getElementById("btn-status-text").innerText = "Cek Status Pembayaran";

    // Mulai Countdown Timer 5 Menit
    startCountdown(300);

    // Tampilkan Custom Modal Overlay (tanpa sembunyikan halaman utama)
    document.getElementById("invoice-payment-modal").classList.remove("hidden");
    document.body.classList.add("overflow-hidden"); // Matikan scroll background
};

function startCountdown(durationSeconds) {
    if (countdownTimerInterval) clearInterval(countdownTimerInterval);
    
    var timerDisplay = document.getElementById("payment-timer");
    var timeRemaining = durationSeconds;

    function tick() {
        var minutes = Math.floor(timeRemaining / 60);
        var seconds = timeRemaining % 60;

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        timerDisplay.innerText = minutes + ":" + seconds;

        if (timeRemaining <= 0) {
            clearInterval(countdownTimerInterval);
            Swal.fire({
                icon: "warning",
                title: "Waktu Pembayaran Habis!",
                text: "Sesi transaksi invoice Anda berakhir otomatis karena batas waktu 5 menit telah terlewati. Silakan lakukan order ulang.",
                confirmButtonColor: "#dc2626"
            }).then(function () {
                kembaliKeToko();
            });
        }
        timeRemaining--;
    }

    tick();
    countdownTimerInterval = setInterval(tick, 1000);
}

// --- DATABASE HELPER FUNCTIONS (JSONP & API INTEGRATION) ---

function fetchJSONP(url, params, callbackName, successCallback, errorCallback) {
    const callbackId = callbackName + "_" + Math.floor(Math.random() * 1000000);
    window[callbackId] = function(data) {
        successCallback(data);
        delete window[callbackId];
        document.body.removeChild(script);
    };

    let fullUrl = url + "?callback=" + callbackId;
    for (let key in params) {
        if (params.hasOwnProperty(key)) {
            fullUrl += "&" + encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
        }
    }

    const script = document.createElement("script");
    script.src = fullUrl;
    script.onerror = function() {
        if (errorCallback) errorCallback();
        delete window[callbackId];
        document.body.removeChild(script);
    };
    document.body.appendChild(script);
}

window.muatProdukDariSheets = function() {
    if (!API_URL) {
        renderProducts();
        return;
    }
    fetchJSONP(
        API_URL,
        { action: "get_products" },
        "callbackProducts",
        function(response) {
            if (response && response.status === "success" && Array.isArray(response.data) && response.data.length > 0) {
                // Map data produk secara case-insensitive
                const mappedProducts = response.data.map(item => {
                    return {
                        id: getCaseInsensitive(item, "id") || "prod-" + Math.floor(Math.random()*10000),
                        nama: getCaseInsensitive(item, "nama") || "-",
                        kategori: getCaseInsensitive(item, "kategori") || "nugget_sosis",
                        deskripsi: getCaseInsensitive(item, "deskripsi") || getCaseInsensitive(item, "text_deskripsi") || "",
                        harga: Number(getCaseInsensitive(item, "harga")) || 0,
                        berat: getCaseInsensitive(item, "berat") || "-",
                        gambar: getCaseInsensitive(item, "gambar") || "https://via.placeholder.com/300x200?text=Frozen+Food",
                        badge: getCaseInsensitive(item, "badge") || ""
                    };
                });
                PRODUCTS_DB = mappedProducts;
            }
            renderProducts();
        },
        function() {
            console.warn("Gagal memuat produk dari sheets. Menggunakan data lokal.");
            renderProducts();
        }
    );
};

window.muatRiwayatTransaksi = function() {
    const loadingOverlay = document.getElementById("loading-riwayat");
    if (loadingOverlay) loadingOverlay.classList.remove("hidden");

    if (!API_URL) {
        if (loadingOverlay) loadingOverlay.classList.add("hidden");
        riwayatTransaksi = MOCK_RIWAYAT_DB;
        renderRiwayatTable();
        return;
    }

    fetchJSONP(
        API_URL, 
        { action: "get_transactions" }, 
        "callbackTransactions", 
        function(response) {
            if (loadingOverlay) loadingOverlay.classList.add("hidden");
            if (response && response.status === "success" && Array.isArray(response.data) && response.data.length > 0) {
                riwayatTransaksi = response.data;
            } else {
                riwayatTransaksi = MOCK_RIWAYAT_DB;
            }
            renderRiwayatTable();
        },
        function() {
            if (loadingOverlay) loadingOverlay.classList.add("hidden");
            console.warn("Gagal menghubungkan database live. Menggunakan data simulasi.");
            riwayatTransaksi = MOCK_RIWAYAT_DB;
            renderRiwayatTable();
        }
    );
};

function renderRiwayatTable() {
    const tbody = document.getElementById("riwayat-table-body");
    const emptyState = document.getElementById("riwayat-empty");
    const paginationControls = document.getElementById("pagination-controls");
    if (!tbody) return;

    if (riwayatTransaksi.length === 0) {
        tbody.innerHTML = "";
        if (emptyState) emptyState.classList.remove("hidden");
        if (paginationControls) paginationControls.innerHTML = "";
        return;
    }

    if (emptyState) emptyState.classList.add("hidden");

    // Urutkan berdasarkan waktu transaksi (terbaru di atas) secara case-insensitive
    riwayatTransaksi.sort((a, b) => new Date(getCaseInsensitive(b, "timestamp")) - new Date(getCaseInsensitive(a, "timestamp")));

    const totalItems = riwayatTransaksi.length;
    const totalPages = Math.ceil(totalItems / riwayatItemsPerPage);
    if (riwayatCurrentPage > totalPages) riwayatCurrentPage = totalPages;
    if (riwayatCurrentPage < 1) riwayatCurrentPage = 1;

    const startIndex = (riwayatCurrentPage - 1) * riwayatItemsPerPage;
    const endIndex = Math.min(startIndex + riwayatItemsPerPage, totalItems);
    const paginatedItems = riwayatTransaksi.slice(startIndex, endIndex);

    let html = "";
    paginatedItems.forEach(row => {
        let tglStr = "-";
        try {
            const rowTimestamp = getCaseInsensitive(row, "timestamp");
            if (rowTimestamp) {
                const d = new Date(rowTimestamp);
                tglStr = d.toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                }) + " " + d.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
            }
        } catch(e) {}

        const invoice = getCaseInsensitive(row, "id_invoice") || getCaseInsensitive(row, "id") || "-";
        const nama = getCaseInsensitive(row, "nama") || "-";
        const detail = getCaseInsensitive(row, "layanan") || "-";
        const metode = getCaseInsensitive(row, "metode") || "-";
        const totalVal = Number(getCaseInsensitive(row, "total")) || 0;

        html += `
        <tr class="hover:bg-slate-50 transition duration-150">
            <td class="py-4 px-4 text-slate-500 whitespace-nowrap">${escapeHTML(tglStr)}</td>
            <td class="py-4 px-4 text-redBrand font-bold whitespace-nowrap">${escapeHTML(invoice)}</td>
            <td class="py-4 px-4 text-slate-800 font-semibold whitespace-nowrap">${escapeHTML(nama)}</td>
            <td class="py-4 px-4 text-slate-600 max-w-xs truncate" title="${escapeHTML(detail)}">${escapeHTML(detail)}</td>
            <td class="py-4 px-4 whitespace-nowrap">
                <span class="px-2.5 py-1 rounded-full text-[10px] font-bold ${
                    metode === 'Kurir Toko' 
                        ? 'bg-amber-50 text-amber-600 border border-amber-200' 
                        : 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                }">${escapeHTML(metode)}</span>
            </td>
            <td class="py-4 px-4 text-right text-slate-900 font-black whitespace-nowrap">Rp ${totalVal.toLocaleString("id-ID")}</td>
        </tr>`;
    });

    tbody.innerHTML = html;

    // Render kontrol pagination
    if (paginationControls) {
        paginationControls.innerHTML = `
        <span class="text-xs text-slate-500 font-bold">
            Menampilkan ${startIndex + 1}-${endIndex} dari ${totalItems} transaksi
        </span>
        <div class="flex items-center gap-2">
            <button onclick="changeRiwayatPage(${riwayatCurrentPage - 1})" ${riwayatCurrentPage === 1 ? 'disabled' : ''} 
                class="px-3.5 py-1.5 bg-white border border-slate-200 hover:border-redBrand hover:text-redBrand text-slate-600 text-xs font-bold rounded-xl transition duration-200 disabled:opacity-50 disabled:pointer-events-none shadow-sm flex items-center gap-1">
                <i class="fas fa-chevron-left text-[9px]"></i> Sebelumnya
            </button>
            <span class="text-xs font-extrabold text-slate-700 bg-redLight/80 border border-redBrand/10 px-3 py-1.5 rounded-xl">
                ${riwayatCurrentPage} / ${totalPages}
            </span>
            <button onclick="changeRiwayatPage(${riwayatCurrentPage + 1})" ${riwayatCurrentPage === totalPages ? 'disabled' : ''} 
                class="px-3.5 py-1.5 bg-white border border-slate-200 hover:border-redBrand hover:text-redBrand text-slate-600 text-xs font-bold rounded-xl transition duration-200 disabled:opacity-50 disabled:pointer-events-none shadow-sm flex items-center gap-1">
                Selanjutnya <i class="fas fa-chevron-right text-[9px]"></i>
            </button>
        </div>`;
    }
}

window.changeRiwayatPage = function(page) {
    riwayatCurrentPage = page;
    renderRiwayatTable();
};

window.cekStatusPembayaran = function () {
    var spinner = document.getElementById("btn-status-spinner");
    var textBtn = document.getElementById("btn-status-text");

    if (spinner) spinner.className = "fab fa-whatsapp fa-spin mr-1.5";
    if (textBtn) textBtn.innerText = "Menghubungkan ke WhatsApp...";

    if (countdownTimerInterval) clearInterval(countdownTimerInterval);

    // Siapkan Payload data pesanan
    var invoiceId = document.getElementById("payment-invoice-id").innerText;
    var nama = document.getElementById("invoice-penerima").innerText;
    var wa = document.getElementById("invoice-wa").innerText;
    var metode = document.getElementById("invoice-metode").innerText;
    var alamat = document.getElementById("invoice-alamat").innerText;
    var catatan = document.getElementById("invoice-catatan").innerText;
    
    // Gabungkan nama-nama produk beserta jumlahnya untuk kolom "layanan"
    var itemsStr = cart.map(function(item) {
        return `${item.nama} (${item.jumlah}x)`;
    }).join(", ");
    
    var totalItems = cart.reduce(function(acc, item) {
        return acc + item.jumlah;
    }, 0);

    var totalAkhirText = document.getElementById("invoice-total").innerText;
    var totalAkhirVal = Number(totalAkhirText.replace(/[^0-9]/g, "")) || 0;

    var postPayload = {
        id_invoice: invoiceId,
        nama: nama,
        whatsapp: wa,
        layanan: itemsStr,
        jumlah: totalItems,
        total: totalAkhirVal,
        metode: metode,
        alamat: alamat,
        catatan: catatan
    };

    // Kirim data transaksi ke Google Sheets via JSONP (GET) dengan fallback ke POST
    if (API_URL) {
        fetchJSONP(
            API_URL,
            {
                action: "add_transaction",
                id_invoice: invoiceId,
                nama: nama,
                whatsapp: wa,
                layanan: itemsStr,
                jumlah: totalItems,
                total: totalAkhirVal,
                metode: metode,
                alamat: alamat,
                catatan: catatan
            },
            "callbackAddTransaction",
            function(response) {
                console.log("Transaksi sukses terkirim ke Sheets via JSONP:", response);
                muatRiwayatTransaksi();
            },
            function() {
                console.warn("Gagal mengirim via JSONP, mencoba POST fallback...");
                // Fallback ke POST dengan text/plain (CORS preflight safe)
                fetch(API_URL, {
                    method: "POST",
                    mode: "no-cors",
                    headers: {
                        "Content-Type": "text/plain"
                    },
                    body: JSON.stringify(postPayload)
                }).then(function() {
                    console.log("Transaksi sukses terkirim ke Sheets via POST fallback.");
                    setTimeout(muatRiwayatTransaksi, 1500);
                }).catch(function(err) {
                    console.error("Gagal mengirim transaksi via POST fallback:", err);
                });
            }
        );
    }

    // Buka link WhatsApp segera agar tidak terblokir popup blocker browser
    var waMessage = `Halo Admin Bibah Frozen Food!\n\nSaya ingin mengonfirmasi pembayaran QRIS untuk pesanan saya:\n\n*ID Invoice:* ${invoiceId}\n*Nama:* ${nama}\n*Metode:* ${metode}\n*Total Tagihan:* ${totalAkhirText}\n\nBerikut saya lampirkan foto bukti transfer pembayaran saya. Terima kasih!`;
    window.open(`https://wa.me/${ADMIN_WA}?text=${encodeURIComponent(waMessage)}`, "_blank");

    // Langsung tampilkan halaman sukses (tanpa menunggu konfirmasi apapun)
    // Saat user kembali dari tab WhatsApp, mereka langsung melihat status SELESAI.

    // Reset Spinner
    if (spinner) spinner.className = "fab fa-whatsapp";
    if (textBtn) textBtn.innerText = "Kirim Bukti Pembayaran via WhatsApp";

    // Generate Nomor Antrian Pengambilan
    var queueId = "BFF-88" + Math.floor(Math.random() * 90 + 10);
    
    // Setel data ke elemen sukses / receipt
    document.getElementById("success-queue-id").innerText = queueId;
    document.getElementById("success-invoice-id").innerText = invoiceId;
    document.getElementById("success-penerima").innerText = nama;
    document.getElementById("success-total").innerText = totalAkhirText;
    
    var instrText = "";
    if (metode === "Kurir Toko") {
        instrText = "Pesanan Anda sedang kami siapkan untuk segera dikirimkan ke alamat tujuan Anda oleh Kurir Toko.";
    } else {
        instrText = "Silakan tunjukkan nomor antrian di atas ke kasir outlet Bibah Frozen Food (Gunungpati, Semarang) untuk mengambil pesanan Anda tanpa perlu mengantre.";
    }
    document.getElementById("success-instruction-text").innerText = instrText;
    
    // Sembunyikan checkout view, tampilkan success view
    document.getElementById("payment-modal-checkout-view").classList.add("hidden");
    document.getElementById("payment-modal-success-view").classList.remove("hidden");
};

window.selesaiBelanjaDanTutup = function() {
    // Kosongkan keranjang belanja
    cart = [];
    appliedPromoCode = "";
    diskonNominal = 0;
    saveCart();

    // Reset checkout form
    var form = document.getElementById("checkout-form");
    if (form) {
        form.reset();
        var wrapper = document.getElementById("alamat-wrapper");
        if (wrapper) wrapper.classList.add("hidden");
    }

    // Reset modal view ke checkout view
    document.getElementById("payment-modal-checkout-view").classList.remove("hidden");
    document.getElementById("payment-modal-success-view").classList.add("hidden");

    kembaliKeToko();
};

window.kembaliKeToko = function () {
    if (countdownTimerInterval) clearInterval(countdownTimerInterval);

    // Jika ditutup saat di layar sukses, kosongkan keranjang secara otomatis
    var successView = document.getElementById("payment-modal-success-view");
    if (successView && !successView.classList.contains("hidden")) {
        cart = [];
        appliedPromoCode = "";
        diskonNominal = 0;
        saveCart();
        
        // Reset checkout form
        var form = document.getElementById("checkout-form");
        if (form) {
            form.reset();
            var wrapper = document.getElementById("alamat-wrapper");
            if (wrapper) wrapper.classList.add("hidden");
        }

        document.getElementById("payment-modal-checkout-view").classList.remove("hidden");
        successView.classList.add("hidden");
    }

    // Sembunyikan Custom Modal Overlay
    document.getElementById("invoice-payment-modal").classList.add("hidden");
    document.body.classList.remove("overflow-hidden"); // Hidupkan kembali scroll background
};

// --- KRITIK & SARAN ---
var saranForm = document.getElementById("saran-form");
if (saranForm) {
    saranForm.addEventListener("submit", function (e) {
        e.preventDefault();
        var nm = document.getElementById("saran-nama").value.trim();
        var psn = document.getElementById("saran-pesan").value.trim();

        if (!nm || !psn) {
            swalWarning("Lengkapi Formulir!", "Harap isi nama dan isi saran Anda terlebih dahulu.");
            return;
        }

        var waSaran = `Halo Admin Bibah Frozen Food!\n\n*KRITIK & SARAN DARI PELANGGAN*\n- *Nama:* ${nm}\n- *Pesan/Saran:* "${psn}"\n\nTerima kasih atas sarannya untuk toko kami!`;
        window.open(`https://wa.me/${ADMIN_WA}?text=${encodeURIComponent(waSaran)}`, "_blank");
        
        saranForm.reset();
        Toast.fire({
            icon: "success",
            title: "✅ Kritik & Saran terkirim! Terima kasih.",
        });
    });
}

// --- INITIALIZE ON DOM LOAD ---
window.addEventListener("DOMContentLoaded", function () {
    // Setup ScrollReveal animations safely
    if (typeof ScrollReveal !== "undefined") {
        try {
            const sr = ScrollReveal({
                distance: "40px",
                duration: 1000,
                easing: "cubic-bezier(0.5, 0, 0, 1)",
                reset: false
            });
            
            sr.reveal("header", { origin: "top", delay: 100 });
            sr.reveal(".reveal-top", { origin: "top", delay: 150 });
            sr.reveal("#home h2", { origin: "bottom", delay: 200 });
            sr.reveal("#home p", { origin: "bottom", delay: 300 });
            sr.reveal("#home .flex-col", { origin: "bottom", delay: 400 });
            sr.reveal("#home .blob", { origin: "left", delay: 300, interval: 100 });
            sr.reveal("#promo", { origin: "bottom", delay: 150 });
            sr.reveal(".promo-badge", { origin: "bottom", interval: 100, delay: 200 });
            sr.reveal("#belanja .text-center", { origin: "top", delay: 100 });
            sr.reveal("#search-input", { origin: "bottom", delay: 200 });
            sr.reveal("#tab-filter-container", { origin: "bottom", delay: 250 });
            sr.reveal(".product-card", { origin: "bottom", interval: 80, delay: 300 });
            sr.reveal("#keranjang", { origin: "bottom", delay: 150 });
            sr.reveal("#keranjang > div > div", { origin: "bottom", interval: 100, delay: 200 });
            sr.reveal("#riwayat", { origin: "bottom", delay: 150 });
            sr.reveal("#kontak", { origin: "bottom", delay: 150 });
            sr.reveal("footer", { origin: "bottom", delay: 100 });
        } catch (e) {
            console.warn("ScrollReveal failed to initialize:", e);
        }
    }

    muatProdukDariSheets();
    muatRiwayatTransaksi();
    loadCart();
});
