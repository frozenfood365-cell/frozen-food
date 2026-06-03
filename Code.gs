/**
 * BIBAH FROZEN FOOD - Google Sheets Apps Script Backend
 * 
 * Cara Penggunaan:
 * 1. Buka Google Sheets Anda.
 * 2. Klik menu 'Ekstensi' -> 'Apps Script'.
 * 3. Hapus semua kode bawaan, lalu paste kode ini.
 * 4. Simpan proyek dengan nama 'Bibah Frozen Backend'.
 * 5. Klik 'Terapkan' (Deploy) -> 'Penerapan baru'.
 * 6. Pilih Jenis: 'Aplikasi Web' (Web App).
 * 7. Konfigurasi:
 *    - Jalankan sebagai: 'Saya' (Me)
 *    - Siapa yang memiliki akses: 'Siapa saja' (Anyone)
 * 8. Klik 'Terapkan' lalu salin URL Web App yang dihasilkan.
 * 9. Tempel URL tersebut pada variabel 'API_URL' di file 'main.js'.
 */

function doGet(e) {
  // Pastikan sheet siap
  initSheets();
  
  var action = e.parameter.action || 'get_products';
  var callback = e.parameter.callback;
  var responseData = {};
  
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    
    if (action === 'get_transactions') {
      var sheet = ss.getSheetByName("Riwayat");
      var data = sheet.getDataRange().getValues();
      var headers = data[0];
      var rows = [];
      
      for (var i = 1; i < data.length; i++) {
        // Skip baris kosong (jika kolom pertama dan kedua kosong)
        if (!data[i][0] && !data[i][1]) continue;
        
        var row = {};
        for (var j = 0; j < headers.length; j++) {
          row[headers[j]] = data[i][j];
        }
        rows.push(row);
      }
      
      responseData = {
        status: "success",
        data: rows
      };
      
    } else if (action === 'add_transaction') {
      var sheet = ss.getSheetByName("Riwayat");
      
      // Tulis baris baru ke sheet Riwayat dari parameter GET
      sheet.appendRow([
        new Date().toISOString(),
        e.parameter.id_invoice || e.parameter.id || "-",
        e.parameter.nama || "-",
        e.parameter.whatsapp || "-",
        e.parameter.layanan || "-",
        e.parameter.jumlah || "-",
        Number(e.parameter.total) || 0,
        e.parameter.metode || "-",
        e.parameter.alamat || "-",
        e.parameter.catatan || "-"
      ]);
      
      responseData = {
        status: "success",
        message: "Data transaksi berhasil disimpan!"
      };
      
    } else { // get_products (default)
      var sheet = ss.getSheetByName("Produk");
      var data = sheet.getDataRange().getValues();
      var headers = data[0];
      var rows = [];
      
      // Jika sheet produk masih kosong/hanya header, berikan sampel data produk
      if (data.length <= 1) {
        insertSampleProducts(sheet);
        data = sheet.getDataRange().getValues();
      }
      
      for (var i = 1; i < data.length; i++) {
        // Skip baris kosong
        if (!data[i][0] && !data[i][1]) continue;
        
        var row = {};
        for (var j = 0; j < headers.length; j++) {
          row[headers[j]] = data[i][j];
        }
        rows.push(row);
      }
      
      responseData = {
        status: "success",
        data: rows
      };
    }
  } catch (error) {
    responseData = {
      status: "error",
      message: error.toString()
    };
  }
  
  // Output JSON / JSONP untuk memintas CORS di browser
  var jsonString = JSON.stringify(responseData);
  if (callback) {
    return ContentService.createTextOutput(callback + '(' + jsonString + ')')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  } else {
    return ContentService.createTextOutput(jsonString)
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  initSheets();
  
  var responseData = {};
  try {
    var postData = {};
    if (e && e.postData && e.postData.contents) {
      try {
        postData = JSON.parse(e.postData.contents);
      } catch (parseError) {
        // Fallback jika berupa format parameter url-encoded
        postData = e.parameter || {};
      }
    } else if (e && e.parameter) {
      postData = e.parameter;
    }
    
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName("Riwayat");
    
    // Tulis baris baru ke sheet Riwayat
    // Kolom: timestamp, id_invoice, nama, whatsapp, layanan, jumlah, total, metode, alamat, catatan
    sheet.appendRow([
      new Date().toISOString(),
      postData.id_invoice || postData.id || "-",
      postData.nama || "-",
      postData.whatsapp || "-",
      postData.layanan || "-",
      postData.jumlah || "-",
      Number(postData.total) || 0,
      postData.metode || "-",
      postData.alamat || "-",
      postData.catatan || "-"
    ]);
    
    responseData = {
      status: "success",
      message: "Data transaksi berhasil disimpan!"
    };
  } catch (error) {
    responseData = {
      status: "error",
      message: error.toString()
    };
  }
  
  return ContentService.createTextOutput(JSON.stringify(responseData))
    .setMimeType(ContentService.MimeType.JSON);
}

// Inisialisasi Sheet dan kolom-kolomnya jika belum dibuat
function initSheets() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // 1. Inisialisasi Sheet Produk
  var sheetProduk = ss.getSheetByName("Produk");
  if (!sheetProduk) {
    sheetProduk = ss.insertSheet("Produk");
    sheetProduk.appendRow(["id", "nama", "kategori", "deskripsi", "harga", "berat", "gambar", "badge"]);
    insertSampleProducts(sheetProduk);
  }
  
  // 2. Inisialisasi Sheet Riwayat
  var sheetRiwayat = ss.getSheetByName("Riwayat");
  if (!sheetRiwayat) {
    sheetRiwayat = ss.insertSheet("Riwayat");
    sheetRiwayat.appendRow(["timestamp", "id_invoice", "nama", "whatsapp", "layanan", "jumlah", "total", "metode", "alamat", "catatan"]);
  }
}

// Menyuntikkan produk sampel secara otomatis jika sheet kosong
function insertSampleProducts(sheet) {
  var samples = [
    ['yona-crispy-nuggets', 'Yona Crispy Chicken Nuggets', 'nugget_sosis', 'Nugget ayam krispi renyah dari Yona, cocok untuk lauk dan camilan keluarga.', 36000, '500g', 'produk/yona-crispy-chicken-nuggets.webp', 'Terlaris'],
    ['asimo-naget-ayam', 'Asimo Naget Ayam', 'nugget_sosis', 'Chicken nugget Asimo 500g, bertekstur lembut di dalam dan renyah di luar.', 27000, '500g', 'produk/asimo-naget-ayam.webp', ''],
    ['oye-klasik-naget', 'Oye Klasik Naget Ayam', 'nugget_sosis', 'Naget ayam klasik Oye, asli dagingnya mantab rasanya. Sudah dimasak, tinggal goreng.', 30000, '500g', 'produk/oye-klasik-naget-ayam.webp', ''],
    ['kanzler-crispy-stick', 'Kanzler Crispy Chicken Nugget Stick', 'nugget_sosis', 'Nugget ayam crispy bentuk stik dari Kanzler, extra meaty dengan bubble crumb premium.', 45000, '450g', 'produk/kanzler-crispy-chicken-nugget-stick.webp', 'Premium'],
    ['hemato-naget-kombinasi', 'Hemato Naget Ayam Kombinasi Reguler', 'nugget_sosis', 'Naget ayam kombinasi reguler dari Hemato, pilihan hemat untuk keluarga.', 25000, '500g', 'produk/hemato-naget-ayam-kombinasi.webp', ''],
    ['richeese-naget-bubble', 'Richeese Factory Naget Ayam Bubble Crumb', 'nugget_sosis', 'Naget ayam crispy bubble crumb dari Richeese Factory, daging ayam pilihan harga ekonomis.', 32000, '450g', 'produk/richeese-naget-bubble-crumb.webp', 'Rekomendasi'],
    ['salam-chicken-nugget', 'Salam Chicken Nugget', 'nugget_sosis', 'Naget ayam kombinasi dari PBS Salam, renyah dan gurih cocok untuk segala usia.', 26000, '500g', 'produk/salam-chicken-nugget.webp', ''],
    ['hemato-naget-ayam', 'Hemato Naget Ayam', 'nugget_sosis', 'Naget ayam klasik Hemato, renyah di luar lembut di dalam. Simpan beku -12°C.', 28000, '500g', 'produk/hemato-naget-ayam.webp', ''],
    ['fiesta-crispy-bubble', 'Fiesta Crispy Bubble', 'nugget_sosis', 'Naget ayam krispi bubble crumb dari Fiesta, extra meaty maximum crispiness.', 38000, '400g', 'produk/fiesta-crispy-bubble.webp', 'Terfavorit'],
    ['fiesta-chicken-nugget', 'Fiesta Chicken Nugget', 'nugget_sosis', 'Naget ayam Fiesta signature recipe, extra meaty juicy inside. Siap masak.', 37000, '400g', 'produk/fiesta-chicken-nugget.webp', 'Terlaris'],
    ['champ-chicken-nugget', 'Champ Chicken Nugget', 'nugget_sosis', 'Naget ayam kombinasi dari Champ, siap masak dan cocok untuk anak-anak.', 35000, '450g', 'produk/champ-chicken-nugget.webp', ''],
    ['kanzler-crispy-nugget', 'Kanzler Crispy Chicken Nugget', 'nugget_sosis', 'Nugget ayam crispy premium Kanzler dengan bubble crumb coating, extra meaty.', 44000, '450g', 'produk/kanzler-crispy-chicken-nugget.webp', 'Premium'],
    ['kanzler-nugget-spicy', 'Kanzler Crispy Chicken Nugget Spicy', 'nugget_sosis', 'Nugget ayam crispy pedas Kanzler dengan bubble crumb, sensasi spicy menggigit!', 45000, '450g', 'produk/kanzler-crispy-chicken-nugget-spicy.webp', 'Pedas'],
    ['kanzler-nugget-original', 'Kanzler Chicken Nugget Original', 'nugget_sosis', 'Nugget ayam original Kanzler premium quality, extra meaty extra 3 pcs!', 46000, '450g', 'produk/kanzler-chicken-nugget-original.webp', 'Premium'],
    ['uenaaak-nugget-coin', 'Uenaaak Nugget Coin by Belfoods', 'nugget_sosis', 'Naget ayam kombinasi bentuk koin dari Belfoods, daging ayam pilihan rasa lebih uenaaak!', 29000, '500g', 'produk/uenaaak-nugget-coin.webp', ''],
    ['hemato-naget-mix', 'Hemato Naget Ayam Kombinasi Mix', 'nugget_sosis', 'Naget ayam kombinasi bentuk mix dari Hemato, berbagai bentuk dalam satu kemasan.', 26000, '500g', 'produk/hemato-naget-ayam-kombinasi-mix.webp', ''],
    ['okey-naget-ayam', 'Okey Naget Ayam', 'nugget_sosis', 'Naget ayam kombinasi dari Okey, simpan beku keep frozen -18°C.', 24000, '500g', 'produk/okey-naget-ayam.webp', ''],
    ['oye-stik-naget', 'Oye Stik Naget Ayam', 'nugget_sosis', 'Naget ayam bentuk stik dari Oye, asli dagingnya mantab rasanya. Sudah dimasak.', 31000, '500g', 'produk/oye-stik-naget-ayam.webp', ''],
    ['okey-stik-naget', 'Okey Stik Naget Ayam', 'nugget_sosis', 'Naget ayam kombinasi bentuk stik dari Okey, simpan beku -18°C.', 25000, '500g', 'produk/okey-stik-naget-ayam.webp', ''],
    ['fiesta-stikie', 'Fiesta Stikie Naget Ayam', 'nugget_sosis', 'Naget ayam bentuk stik dari Fiesta, crunchy outside juicy inside extra meaty.', 37000, '400g', 'produk/fiesta-stikie.webp', ''],
    ['champ-nugget-stick', 'Champ Chicken Nugget Stick', 'nugget_sosis', 'Naget ayam kombinasi bentuk stik dari Champ, siap masak simpan beku -18°C.', 34000, '450g', 'produk/champ-chicken-nugget-stick.webp', ''],
    ['fiesta-nugget-pizzabo', 'Fiesta Nugget Pizzabo ABC', 'kentang_camilan', 'Naget ayam bentuk huruf ABC rasa pizza dari Fiesta, favorit anak-anak!', 36000, '400g', 'produk/fiesta-nugget-pizzabo.webp', 'Kids'],
    ['oye-funny-naget', 'Oye Funny Naget Ayam', 'kentang_camilan', 'Naget ayam bentuk lucu dari Oye, mantab rasanya cocok untuk camilan anak.', 30000, '500g', 'produk/oye-funny-naget-ayam.webp', 'Kids'],
    ['champ-nugget-abc', 'Champ Chicken Nugget ABC', 'kentang_camilan', 'Naget ayam kombinasi bentuk abjad ABC dari Champ, siap masak favorit si kecil!', 34000, '450g', 'produk/champ-chicken-nugget-abc.webp', 'Kids'],
    ['fiesta-nugget-dino', 'Fiesta Nugget Dino', 'kentang_camilan', 'Naget ayam bentuk dinosaurus lucu dari Fiesta, cute dino shape yummy!', 36000, '400g', 'produk/fiesta-nugget-dino.webp', 'Kids'],
    ['oye-koin-naget', 'Oye Koin Naget Ayam', 'kentang_camilan', 'Naget ayam bentuk koin lucu dari Oye, asli dagingnya mantab rasanya.', 30000, '500g', 'produk/oye-koin-naget-ayam.webp', 'Kids'],
    ['champ-crunchy-nugget', 'Champ Crunchy Nugget', 'nugget_sosis', 'Naget ayam kombinasi renyah dari Champ edisi BoBoiBoy, simpan beku -18°C.', 35000, '450g', 'produk/champ-crunchy-nugget.webp', ''],
    ['fiesta-pok-pok', 'Fiesta Pok-Pok', 'bakso_dimsum', 'Daging ayam olahan bite-size dari Fiesta, great taste siap masak ready to cook.', 35000, '400g', 'produk/fiesta-pok-pok.webp', 'Rekomendasi'],
    ['fiesta-spicy-wing', 'Fiesta Spicy Wing', 'bakso_dimsum', 'Sayap ayam dengan bumbu pedas dari Fiesta, selected seasoning juicy inside.', 40000, '400g', 'produk/fiesta-spicy-wing.webp', 'Pedas'],
    ['fiesta-crispy-crunch', 'Fiesta Crispy Crunch', 'bakso_dimsum', 'Kulit ayam goreng crispy crunch dari Fiesta, tasty snack flavorful!', 30000, '300g', 'produk/fiesta-crispy-crunch.webp', ''],
    ['fiesta-spicy-chick', 'Fiesta Spicy Chick', 'bakso_dimsum', 'Daging ayam dengan bumbu pedas spesial dari Fiesta, specially seasoned juicy inside.', 38000, '400g', 'produk/fiesta-spicy-chick.webp', 'Pedas'],
    ['fiesta-karage', 'Fiesta Karage', 'bakso_dimsum', 'Daging paha ayam karage renyah ala Jepang dari Fiesta, juicy inside crunchy outside.', 39000, '400g', 'produk/fiesta-karage.webp', 'Terfavorit']
  ];
  
  for (var i = 0; i < samples.length; i++) {
    sheet.appendRow(samples[i]);
  }
}
