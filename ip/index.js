//axios import buraya gelecek
import axios from 'axios';

var benimIP;


// ------------ değiştirmeyin --------------
// licensed to Ergineer 2022
require("babel-core/register");
require("babel-polyfill");
async function ipAdresimiAl(){
	await axios({
		method: 'get',
		url: 'https://apis.ergineer.com/ipadresim',
	})
	.then(function (response) {
		return response.data
	})
	.then(function (a) {
		benimIP=a
	});
}				
// ------------ değiştirmeyin --------------


/*
	ADIM 1: axios kullanarak, aşağıdaki URL'ye GET sorgusu atacağız
    (tag içindeki yere kendi ipnizi yazarak URL'yi oluşturun):
    https://apis.ergineer.com/ipgeoapi/<ipniz>
	
	NOT: Bilgisayarın IP adresini öğrenmek için: https://apis.ergineer.com/ipadresim 
	ADIM 5'e gelene kadar fonksiyonunuzu test etmek için ip nizi URL'ye manuel olarak ekleyebilirsiniz.
*/

/*
	ADIM 2: Geri döndürülen verileri inceleyin, bu sizin ip bilgileriniz! Bileşen fonksiyonunuzu geliştirmek içindeki bu veri yapısını
	iyice anlamanız gerekmektedir.
	
*/
/*
	ADIM 3: Argümanı sadece 1 nesne kabül eden bir fonksiyon oluşturun.
    DOM metotlarını ve özelliklerini kullanarak, şunları gerçekleştirin:
	NOT: API'den gelen bayrak url'i çalışmazsa alternatif olarak: https://flagsapi.com/
	<div class="card">
	<img src={ülke bayrağı url} />
	<div class="card-info">
		<h3 class="ip">{ip adresi}</h3>
		<p class="ulke">{ülke bilgisi (ülke kodu)}</p>
		<p>Enlem: {enlem} Boylam: {boylam}</p>
		<p>Şehir: {şehir}</p>
		<p>Saat dilimi: {saat dilimi}</p>
		<p>Para birimi: {para birimi}</p>
		<p>ISP: {isp}</p>
	</div>
    </div>
*/

/*
	ADIM 4: API'den alınan verileri kullanarak ADIM 3'te verilen yapıda bir kart oluşturun ve 
	bu kartı DOM olarak .cards elementinin içine ekleyin. 
*/

/*
	ADIM 5: Manuel olarak eklediğiniz IP adresini dinamiğe dönüştürün. 
	Sayfanın en üstünde ---değiştirmeyin--- etiketleri arasında yer alan asenkron ipAdresimiAl() fonksiyonuna 
	sorgu atarak bilgisayarınız IP adresini dinamik olarak aldıracaksınız. Bu fonksiyon asenkron olarak çağırıldığında `benimIP` değişkenine 
	bilgisayarınızın IP adresini atayacaktır. 
	Örnek dinamik URL kullanımı: var url = "https://apis.ergineer.com/ipgeoapi/"+benimIP; 
*/



//kodlar buraya gelecek
let benimBilgiler;
function bilgileriGetir(myIp) {
	return axios.get(`https://apis.ergineer.com/ipgeoapi/${myIp}`)
		.then((res) => {
			return res.data
		})
		.then(data => {
			benimBilgiler = data
		})
}

const sayfaYapici = (bilgiler) => {
	const card = document.createElement('div');
	card.classList.add("card")

	const bayrak = document.createElement('img');
	bayrak.src = "https://flagsapi.com/TR/flat/64.png"

	const card_info = document.createElement('div');
	card_info.classList.add("card-info")

	  const ip_adresi = document.createElement('h3');
	  ip_adresi.classList.add("ip");
	  ip_adresi.textContent = bilgiler.sorgu;

	  const ulke = document.createElement('p');
	  ulke.classList.add("ulke");
	  ulke.textContent = bilgiler["ülke"] +" (" + bilgiler["ülkeKodu"] + ")"

	  const enlem = document.createElement('p');
	  enlem.textContent = `Enlem: ${bilgiler["enlem"]} Boylam: ${bilgiler["boylam"]}`

	  const sehir = document.createElement('p');
	  sehir.textContent = `Şehir: ${bilgiler["şehir"]}`

	  const saat_dilimi = document.createElement('p');
	  saat_dilimi.textContent = `Saat dilimi: ${bilgiler["saatdilimi"]}`

	  const para_birimi = document.createElement('p');
	  para_birimi.textContent = `Para birimi: ${bilgiler["parabirimi"]}`

	  const isp = document.createElement('p');
	  isp.textContent = `ISP: ${bilgiler["isp"]}`

	  card_info.append(ip_adresi, ulke, enlem, sehir, saat_dilimi, para_birimi, isp);

	card.append(bayrak, card_info)

	return card
  }

const cards = document.querySelector('.cards')

ipAdresimiAl()
  		.then(() => {
			bilgileriGetir(benimIP)
				.then(() => {
					cards.append(sayfaYapici(benimBilgiler))
				})
		})