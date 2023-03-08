const routes = [
    {
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return "Homepage";
        },
    },
    {
        method: '*',
        path: '/',
        handler: (request, h) => {
            return "Halaman tidak dapat diakses menggunakan method tersebut";
        },
    },
    {
        method: 'GET',
        path: '/about',
        handler: (request, h) => {
            return "About Page";
        },
    },
    {
        method: '*',
        path: '/about',
        handler: (request, h) => {
            return "Halaman tidak dapat diakses menggunakan method tersebut";
        },
    },
    {
        method: '*',
        path: '/{any*}',
        handler: (request, h) => {
            return "Halaman tidak ditemukan";
        },
    },
    {
        method: 'GET',
        path: '/hello/{name?}',
        handler: (request, h) => {
            const { name = "Stranger" } = request.params;
            const { lang } = request.query;

            if (lang === 'id') {
                return `Hai, ${name}!`
            }

            return `Hello , ${name}!`;
        },
    },


    {
        method: 'POST',
        path: '/login',
        handler: (request, h) => {
            const { username, password } = request.payload;
            return `Welcome ${username}!`;
        }
        // untuk test nya silahkan buka postman urlnya = menggunakan method POST pilih body->raw->JSON
        //masukan { "username": "harrypotter", "password": "encryptedpassword" }
        //output Welcome harrypotter!
    },


];

module.exports = routes;



// method memiliki nilai ‘*’, itu artinya route dapat diakses menggunakan seluruh method yang ada pada HTTP.

// Kemudian nilai ‘/{any*}’ pada route paling akhir, ini berfungsi untuk menangani permintaan masuk pada path yang belum Anda tentukan. Ini merupakan salah satu teknik dalam menetapkan routing yang dinamis menggunakan Hapi.

// Path Parameter
// Di Hapi Framework teknik tersebut sangat mudah untuk diterapkan.Cukup dengan membungkus path dengan tanda { }Nantinya parameter ini akan disimpan sebagai properti pada request.params yang dimiliki handler dengan nama sesuai yang Anda tetapkan(username).Sebagai contoh, bila Anda melakukan permintaan ke server dengan alamat ‘/users/harry’, maka server akan menanggapi dengan ‘Hello, harry!’.
// Pada contoh kode di atas, nilai path parameter wajib diisi oleh client.Bila client mengabaikannya dengan melakukan permintaan pada alamat ‘/users’, maka server akan mengalami eror.

// Tapi tenang, pada Hapi Anda dapat membuat path parameter bersifat opsional.Caranya dengan menambahkan tanda “?” di akhir nama parameternya.Berikut contoh yang sama namun dengan implementasi opsional path parameter:

// server.route({
//     method: 'GET',
//     path: '/users/{username?}',
//     handler: (request, h) => {
//         const { username = 'stranger' } = request.params;
//         return `Hello, ${username}!`;
//     },
// });

// Sekarang bila client meminta pada alamat ‘/users/dicoding’, server menanggapi dengan ‘Hello, dicoding!’; dan bila client meminta hanya pada path ‘/users’, server akan menanggapinya dengan ‘Hello, stranger!’.


// curl - X GET http://localhost:5000/hello/dicoding
// output: Hello, dicoding!
// curl - X GET http://localhost:5000/hello
// output: Hello, stranger!


// Query Parameters
// Selain path parameter, terdapat cara lain yang sering digunakan dalam mengirimkan data melalui URL, yakni dengan query parameter.Teknik ini umum digunakan pada permintaan yang membutuhkan kueri dari client, contohnya seperti pencarian dan filter data.

// Data yang dikirim melalui query memiliki format key = value.Contohnya:

// localhost: 5000 ? name = harry & location=bali
// Contoh di atas memiliki dua query parameter.Yang pertama adalah name = harry dan location = bali.Di Hapi, Anda bisa mendapatkan nilai dari query parameter melalui request.query

// curl - X GET http://localhost:5000/hello/dicoding?lang=id
// // output: Hai, dicoding!
// curl - X GET http://localhost:5000/hello/dicoding
// // output: Hello, dicoding!