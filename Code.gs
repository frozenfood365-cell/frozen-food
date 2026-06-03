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
    ["nugget-01", "Chicken Nugget Bubble Crumb", "nugget_sosis", "Nugget dada ayam premium berlapis tepung bubble crumbs yang renyah & gurih.", 38000, "500g", "https://images.unsplash.com/photo-1562967916-eb82221dfb92?q=80&w=600&auto=format&fit=crop", "Terlaris"],
    ["sosis-02", "Smoked Beef Sausage Premium", "nugget_sosis", "Sosis daging sapi dengan aroma asap premium alami, tebal & bertekstur kenyal.", 42000, "450g", "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600&auto=format&fit=crop", "Diskon 10%"],
    ["bakso-03", "Bakso Sapi Urat Istimewa", "bakso_dimsum", "Bakso daging sapi urat asli dengan kuah kaldunya yang mantap & gurih kenyal.", 35000, "500g", "https://images.unsplash.com/photo-1529042410759-befb1204b468?q=80&w=600&auto=format&fit=crop", "Terfavorit"],
    ["dimsum-04", "Dimsum Ayam Mentai Mozzarella", "bakso_dimsum", "Dimsum ayam lembut disiram saus mentai gurih bertabur keju mozzarella premium lumer.", 28000, "8 Pcs", "https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=600&auto=format&fit=crop", "Rekomendasi"],
    ["kentang-05", "French Fries Shoestring Impor", "kentang_camilan", "Kentang goreng stik impor kualitas restoran cepat saji, renyah di luar lembut di dalam.", 29000, "1 Kg", "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=600&auto=format&fit=crop", "Hemat"],
    ["camilan-06", "Cireng Rujak Salju Crispy", "kentang_camilan", "Cireng putih salju renyah garing dengan bumbu rujak pedas manis asam yang segar.", 18000, "500g", "https://images.unsplash.com/photo-1626132647523-66f5bf380027?q=80&w=600&auto=format&fit=crop", ""],
    ["nugget-07", "Chicken Nugget Cheese Lumer", "nugget_sosis", "Nugget daging ayam premium dengan isian keju lumer yang meleleh saat digigit.", 40000, "400g", "https://images.unsplash.com/photo-1541532713592-79a0317b6b77?q=80&w=600&auto=format&fit=crop", "Terbaru"],
    ["dimsum-08", "Dimsum Udang Hakau Lembut", "bakso_dimsum", "Hakau kulit transparan kenyal isi udang utuh segar, juicy & kaya rasa.", 32000, "6 Pcs", "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?q=80&w=600&auto=format&fit=crop", "Istimewa"]
  ];
  
  for (var i = 0; i < samples.length; i++) {
    sheet.appendRow(samples[i]);
  }
}
