/* 
  Buradan başlayın ve iç içe geçmiş bileşenlere doğru ilerleyin.
  Projedeki tüm dosyalara kod eklenmesi gerekmez.
  Nerelerde değişiklik yapmanız gerektiğini anlamak için her dosyayı inceleyin.
*/

// State hook u import edin
import React, { useState } from "react";
import AramaCubugu from "./bilesenler/AramaCubugu/AramaCubugu";
import Gonderiler from "./bilesenler//Gonderiler/Gonderiler";
import sahteVeri from "./sahte-veri";

// Gönderiler (çoğul!) ve AramaÇubuğu bileşenlerini import edin, çünkü bunlar App bileşeni içinde kullanılacak
// sahteVeri'yi import edin
import "./App.css";

const App = () => {
  const [posts, setPosts] = useState(sahteVeri);
  const [search, setSearch] = useState("");
  const [myLikes, setMyLikes] = useState([]);
  // Gönderi nesneleri dizisini tutmak için "gonderiler" adlı bir state oluşturun, **sahteVeri'yi yükleyin**.
  // Artık sahteVeri'ye ihtiyacınız olmayacak.
  // Arama çubuğunun çalışması için , arama kriterini tutacak başka bir state'e ihtiyacımız olacak.
  const searchChangeHandler = (event) => {
    const { value } = event.target;
    setSearch(value);
    // todo arama fonksiyonu yazılacak ..
    const searchResult = sahteVeri.filter((item) => {
      return item.username.includes(value);
    });
    setPosts(searchResult);
  };

  const gonderiyiBegen = (gonderiID) => {
    const guncelPosts = posts.map((item) => {
      if (item.id == gonderiID) {
        if (!myLikes.includes(gonderiID)) {
          item.likes++;
          setMyLikes([...myLikes, gonderiID]);
        } else {
          item.likes--;
          myLikes.splice(myLikes.indexOf(gonderiID), 1);
          setMyLikes([...myLikes]);
        }
      }
      return item;
    });

    setPosts(guncelPosts);
    /*
      Bu fonksiyon, belirli bir id ile gönderinin beğeni sayısını bir artırma amacına hizmet eder.

      Uygulamanın durumu, React ağacının en üstünde bulunur, ancak iç içe geçmiş bileşenlerin stateleri değiştirememesi adil olmaz!
      Bu fonksiyon, belirli bir gönderinin beğeni sayısını artırılmasına olanak sağlamak amacıyla iç içe geçmiş bileşenlere aktarılır.

	  "setGonderi" yi çağırın ve state ine "posts.map" çağrısını iletin.
      `map` içine iletilen callback aşağıdaki mantığı gerçekleştirir:
        - gönderinin idsi "gonderiID" ile eşleşirse, istenen değerlerle yeni bir gönderi nesnesi döndürün.
        - aksi takdirde, sadece gönderi nesnesini değiştirmeden döndürün.
     */
  };

  return (
    <div className="App">
      App Çalışıyor
      {/* Yukarıdaki metni projeye başladığınızda silin*/}
      {/* AramaÇubuğu ve Gönderiler'i render etmesi için buraya ekleyin */}
      <AramaCubugu search={search} changeHandler={searchChangeHandler} />
      <Gonderiler gonderiyiBegen={gonderiyiBegen} gonderiler={posts} />
      {/* Her bileşenin hangi proplara ihtiyaç duyduğunu kontrol edin, eğer ihtiyaç varsa ekleyin! */}
    </div>
  );
};

export default App;
