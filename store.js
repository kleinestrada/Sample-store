if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded',ready)
}else{
    ready()
}

function ready(){
    var removeCartItemButton = document.getElementsByClassName('btn-danger')
        for(var i = 0; i<removeCartItemButton.length;i++){
            var button = removeCartItemButton[i]
            button.addEventListener('click',removeCartItem)
        }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for(var i = 0; i<quantityInputs.length;i++){
        var input = quantityInputs[i]
        input.addEventListener('change',quantityChange)
    }

    var addaToCartaButtons = document.getElementsByClassName('shop-item-button')
    for(var i = 0; i<addaToCartaButtons.length;i++){
        var button = addaToCartaButtons[i]
        button.addEventListener('click', addaToCartaClick)
    }

    var promocode = document.getElementsByClassName('btn-promo')
    for(var i = 0; i<promocode.length;i++){
        var box = promocode[i]
        box.addEventListener('click', updateCartTotal)
    }

}

function addaToCartaClick(event){
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    addaItemToCarta(title,price, imageSrc)
    updateCartTotal()
}

function addaItemToCarta(title, price, imageSrc){
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            var quanity = parseInt(cartItemNames[i].parentElement.parentElement.getElementsByClassName('cart-quantity-input')[0].value)
            cartItemNames[i].parentElement.parentElement.getElementsByClassName('cart-quantity-input')[0].value = quanity + 1
            return
        }
    }

    var cartcontents = '<div class="cart-item cart-column"><img class="cart-item-image" src="' + imageSrc + '"width="100" height="100"><span class="cart-item-title">' + title + '</span></div><span class="cart-price cart-column">' + price + '</span><div class="cart-quanity cart-column"><input class="cart-quantity-input" type="number" value="1"><button class="btn btn-danger cart-quantity-button" type="button">REMOVE</button></div>'
    cartRow.innerHTML=cartcontents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change',quantityChange)
}

function quantityChange(event){
    var input = event.target
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1
    }
    updateCartTotal()
}

function incrementquantity(event){
    var quantity = event.target
    quantity.value = quantity + 1
    updateCartTotal()
}

function removeCartItem(event){
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function updateCartTotal(){
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for(var i = 0; i < cartRows.length;i++){
        var cartRow = cartRows[i]
        //var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var itemName = cartRow.getElementsByClassName('cart-item-title')[0].innerHTML
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        //var price = parseFloat(priceElement.innerText.replace('$',''))
        var quantity = quantityElement.value
        total = total + calculateTotal(itemName, quantity)
        //total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}

function calculateTotal(itemName, quantity){
    var Unli_1GB_name = document.getElementById('ult_small').getElementsByClassName('shop-item-title')[0].innerHTML
    var Unli_2GB_name = document.getElementById('ult_medium').getElementsByClassName('shop-item-title')[0].innerHTML
    var Unli_5GB_name = document.getElementById('ult_large').getElementsByClassName('shop-item-title')[0].innerHTML
    var UnoGB_name = document.getElementById('1gb').getElementsByClassName('shop-item-title')[0].innerHTML
    var Unli_1GB_price = parseFloat(document.getElementById('ult_small').getElementsByClassName('shop-item-price')[0].innerText.replace('$',''))
    var Unli_2GB_price = parseFloat(document.getElementById('ult_medium').getElementsByClassName('shop-item-price')[0].innerText.replace('$',''))
    var Unli_5GB_price = parseFloat(document.getElementById('ult_large').getElementsByClassName('shop-item-price')[0].innerText.replace('$',''))
    var UnoGB_price = parseFloat(document.getElementById('1gb').getElementsByClassName('shop-item-price')[0].innerText.replace('$',''))

    var actualValue = 0
    
    if (itemName == Unli_1GB_name){
        for(var i=0; i < quantity ; i++){
            if(i == 0 || (i +1) % 3 != 0){
                actualValue = actualValue + Unli_1GB_price
            }
        }
    }

    if(itemName == Unli_5GB_name && quantity > 3){
        actualValue = actualValue + (39.90 * quantity)
    }else if(itemName == Unli_5GB_name && quantity < 3){
        actualValue = actualValue + (Unli_5GB_price * quantity)
    }

    if(itemName == UnoGB_name){
        actualValue = actualValue + (UnoGB_price * quantity)
    }

    if(itemName == Unli_2GB_name){
        actualValue = actualValue + (Unli_2GB_price * quantity)
        freeitem()
    }

    if(document.getElementById('promo').value !== null && document.getElementById('promo').value == 'I<3AMAYSIM'){
        actualValue  = actualValue - (actualValue * 0.10)
    }

    return actualValue

}

function freeitem(){
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == '1GB DATA-PACK Free') {
            var quanity = parseInt(cartItemNames[i].parentElement.parentElement.getElementsByClassName('cart-quantity-input')[0].value)
            cartItemNames[i].parentElement.parentElement.getElementsByClassName('cart-quantity-input')[0].value = quanity + 1
            return
        }
    }

    var cartcontents = '<div class="cart-item cart-column"><img class="cart-item-image" src="Images/1GB Data pack.png"width="100" height="100"><span class="cart-item-title">1GB DATA-PACK Free</span></div><span class="cart-price cart-column">Free</span><div class="cart-quanity cart-column"><input class="cart-quantity-input" type="number" value="1" disabled><button class="btn btn-danger cart-quantity-button" type="button">REMOVE</button></div>'
    cartRow.innerHTML=cartcontents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change',quantityChange)
}