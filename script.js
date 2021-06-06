var moneyInWallet = 0;
var savatcha = [];

$(document).ready(function(){
    // AGAR MAHSULOTLAR BO'LSA MAHSULOTLARNI SAYTDA KO'RSATISH KERAK.
    if(products.length > 0){

            // Tovarlarni saytda ko'rsatish

            // Maxsulotlar joylanadigan yerni bo'shatib olish
            $("#product-wrapper").html("");

            // Mahsulotlarni birma-bir joylashtirish
             products.forEach(function(item){
                 var product = $('<div class="col-6 col-sm-4 col-xl-3"></div>');
                 var productCard = $('<div class="card product mx-1 mb-3" data-product-quantity="'+item.quantity+'" data-product-price="'+item.price+'" data-product-color="'+item.color+'" data-product-brand="'+item.brand+'" data-product-storage="'+item.storage+'"></div>');
                 // Rasmni yaratish va qo'shish
                 var productImage = $('<img src="img/'+ item.image +'" class="card-img-top product_image" alt="rasm">');
                 // Body ni yaratib , uning ichidagi ma'lumotlarni joylash
                 productCard.append(productImage);
                 var productCardBody = $('<div class="card-body p-2"></div>');
                 var productName = $('<h4 class="h6 product_name text-center ">'+item.name+' <br>'+item.storage+ 'GB ' + item.color+ '</h4>');
                 var productPrice = $('<div class="product_price"> <strong>Narxi:</strong> '+ item.price +' so\'m</div>');
                 var productQuantity = $('<div class="product_quantity mb-2 "><span class="product-quantity-span"><strong>Quantity: </strong>'+ item.quantity +'</span></div>');
                 var quantityControllersWrapper = $('<div class="d-flex justify-content-between mb-2"></div>')
                 var minusOneButton = $('<button class="remove-one-btn btn btn-default btn-sm bg-secondary w-25">-</button>')
                 var productQuantityInput = $('<input type="number" class="form-control product-quantity-input mx-1" value="1" min="1">')
                 var plusOneButton = $('<button class="add-one-btn btn btn-default btn-sm bg-secondary w-25">+</button>')
                 var addToBasketButton = $('<div class="btn btn-block btn-success add-to-basket-btn">Add to basket</div>')
                
                // Boshqaruvchi tugmalarni o'z idishiga solamiz
                quantityControllersWrapper.append(minusOneButton,productQuantityInput,plusOneButton);
                // CardBody ichiga mos elementlarni joylaymiz
                productCardBody.append(productName,productPrice,productQuantity,
                quantityControllersWrapper,addToBasketButton);

                // Card ichiga rasm va cardBody ni joylaymiz
                productCard.append(productImage, productCardBody)
                product.append(productCard)
                
                
                 // Mahsulotlarni o'rab turuvchi quti ichiga joylash
                $("#product-wrapper").append(product);
         
         
         
                 
        });
    }
    //Hamyondagi summani saqlab olish kerak
    $("#save-money-in-wallet-btn").click(function(event){
        //shakl yuborilishini to'xtatish
        event.preventDefault();
        //ko'p takrorlanayotgan elementni o'zgaruvchiga biriktirib qo'yish
        var moneyInWalletInput =  $("#money-in-wallet-input")
        if( moneyInWalletInput.val() < 1){

            alert("Iltimos, ko'proq summadagi pul kiriting")
            return;
        }
        //maydonga kiritilga summani o'zgaruvchiga saqlab olish
         moneyInWallet = moneyInWalletInput.val();
        //maydonni ichini bo'shatib olamiz
         moneyInWalletInput.val("");
        //hamyondagi pulni matn ko'rinishida ko'rsatish
        $("#money-in-wallet-text").text(moneyInWallet);
    });


    //Foydalanuvchi mahsulot sonini o'zi qo'lda kiritib , uni 1 dan kam qilsa , xatoni to'g'rilash kerak.
    $(".product-quantity-input").blur(function(){
        if($(this).val() < 1){
            alert("Mahsulot soni kamida 1 ga teng bo'lishi kerak.")
            $(this).val(1);
        }
        var productTotalQuantity = $(this).closest(".product").data("product-quantity");
        if($(this).val()>(productTotalQuantity)){
        alert("Afsuski, omborda bundan ko'p mahsulot yo'q. Boshqa telefonlarni ham ko'rishingizni tavsiya qilamiz.");
            $(this).val(productTotalQuantity);
        }
    });


    // Minus tugmasi bosilganda maxsulot soni kamaysin
    $(".remove-one-btn").click(function(){
        // Qo'shni joyda turgan inputni tanlab olish
      var productQuantityInput = $(this).closest(".product").find(".product-quantity-input");
      var productQuantity = productQuantityInput.val();
      
        // Maxsulot soni 1 bo'lsa , amal shu joyda to'xtatilsin
        if(productQuantity <= 1){
            alert("Maxsulot soni kamida 1 ta bo'lishi kerak.");
            return; 
        }

        //mahsulot sonini bittaga kamaytirish
        
        productQuantity --;
        productQuantityInput.val(productQuantity);
        

    });

    // Plus tugmasi bosilganda maxsulot soni ko'paysin
    $(".add-one-btn").click(function(){
        var product = $(this).closest(".product");
        var productTotalQuantity = product.data("product-quantity");
        // Qo'shni joyda turgan inputni tanlab olish
        var productQuantityInput = $(this).closest(".product").find(".product-quantity-input");
        var productQuantity = productQuantityInput.val();
      
        // Maxsulot soni ombordagi bor mahsulotlar sonidan ko'payib ketishiga yo'l qo'ymaymiz.

        if(productQuantity >= productTotalQuantity){
            alert("Afsuski, omborda bundan ko'p mahsulot yo'q. Boshqa telefonlarni ham ko'rishingizni tavsiya qilamiz.");
            productQuantity--;
            return; 
        }

        //mahsulot sonini bittaga ko'paytirish
        
        productQuantity ++;
        // maydon qiymatini moslab qo'yamiz
        productQuantityInput.val(productQuantity);
        

    });

    // SAVATCHAGA QO'SHISH TUGMASI BOSILGANDA TOVAR SAVATCHAGA QO'SHILADI
    $(".add-to-basket-btn").click(function(){
        // takrorlanuvchi element tanlash amalini o'zgaruvchiga tenglashtiramiz
        var product = $(this).closest(".product")

        // savachaga qo'shiladigan ma'lumot uchun bo'sh obyekt yaratamiz
        var productToAdd = {};

        // kerakli xususiyatlarni obyektga biriktirib chiqamiz
        productToAdd.name = product.find(".product_name").text();
        productToAdd.price = product.data("product-price");
        productToAdd.quantity = parseInt(product.find(".product-quantity-input").val(),10);
        
        // Mahsulot savatchada bormi?
        var productIndexInBasket = savatcha.findIndex(function(element){
            return element.name === productToAdd.name
        });
        // Tanlangan va tayyor obyektni savatcha massiviga qo'shamiz yoki mavjud tovarni sonini o'zgartirib qo'yamiz
        if(productIndexInBasket > -1){
            savatcha[productIndexInBasket].quantity += productToAdd.quantity;
        }else{
            savatcha.push(productToAdd);
        }
        

        // Mavjud tovar sonidan qo'shilgan tovarlar sonini ayiramiz
        var productInStock = product.data("product-quantity");
        productInStock -= productToAdd.quantity;
        product.data("product-quantity" , productInStock);
        
        // nechta tovar qolganligini mos yerda matn ko'rinishida ko'rsatish
        product.find(".product-quantity-span").text(productInStock);
        product.find(".product-quantity-input").val(1);

        // MAXSULOT QOLMAGAN BO'LSA SAVATCHAGA QO'SHISH TUGMASI ISHLAMAYDIGAN BO'LADI.
        if(productInStock === 0){
            product.addClass("sold-out");
            $(this).attr("disabled",true);
            
        }

        console.log(savatcha);
         
    });

    // SAVATCHADAGI ELEMENTLARNI KO'RSATISH

    function showBasketContents(){
        savatcha.forEach(function(item){
            var itemLi = $('<li class="basket-item border-bottom pb-2"></li>');
            var itemNameAndPriceDiv = $('<div class="d-flex justify-content-between mb-2 basket-product-name-price"></div>');
            var itemName = $('<strong class="basket-item_name">Product name</strong>');
            var itemPrice = $('<span><strong class="basket-item_price">Product price</strong> so\'m</span>')
        });
    }

});