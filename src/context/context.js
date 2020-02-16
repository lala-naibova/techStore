import React, { Component } from 'react';
import {linkData} from './linkData'
import {sosialData} from './sosialData'
//import {items} from './productData'
import {client} from './contentful'

const ProductContext  = React.createContext();

class ProductProvider extends Component{
    state={
        sideBarOpen: false,
        cartOpen: false,
        cartItems: 0,
        links: linkData,
        cart:[],
        sosialLinks : sosialData,
        cartSubTotal:0,
        cartTax:0,
        cartTotal:0,
        storedProducts : [],
        filteredProducts :[],
        featuredProducts :[],
        singleProduct :{},
        loading:false,
        search:'',
        price:0,
        maxPrice:0,
        minPrice:0,
        shipping: false,
        company:'all'

    }
    componentDidMount(){
        //from contentful items
        client.getEntries({
            content_type:'techStore'
        })
        .then(response=> this.setProducts(response.items))
        .catch(console.error)
        //this.setProducts(items);
    }
    //set products
setProducts=(items)=>{
    let storedProducts = items.map(item=>{
        const {id} = item.sys;
        const image = item.fields.image.fields.file.url;
        const product = {id, ...item.fields,image};
        return product});

    let featuredProducts = storedProducts.filter(item=>item.featured === true);

    //get max price
    let maxPrice = Math.max(...storedProducts.map(elem=>elem.price))
    this.setState({
        price:maxPrice,
        maxPrice,
        storedProducts,
        filteredProducts:storedProducts, 
        featuredProducts,
        cart : this.getStorageCart(),
        singleProduct : this.getStorageProduct(),
        loading: false}, 
        ()=> this.addTotals());
    }
    //get vart from storage
    getStorageCart=()=>{
        let cart = [];
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'));
        }
        return cart;
    }
    //get product from local storage
    getStorageProduct=()=>{
        return localStorage.getItem('singleProduct')? JSON.parse(localStorage.getItem('singleProduct')):{};
    }
    //get totals
    getTotals = () =>{
        let subTotal = 0;
        let cartItems =0;
        this.state.cart.forEach(item=>{
            subTotal += item.total;
            cartItems += item.count;
        })
        subTotal = parseFloat(subTotal.toFixed(2));
        let tax = subTotal * 0.3; 
        tax = parseFloat(tax.toFixed(2));
        let total = subTotal + tax;
        total = parseFloat(total.toFixed(2));
        return {cartItems,subTotal,tax,total}
    }

    //add totals
    addTotals =() =>{
        let totals = this.getTotals();
        this.setState({cartItems : totals.cartItems,
            cartSubTotal: totals.subTotal,
            cartTax : totals.tax,
            cartTotal:totals.total})
    }

    //sync storage
    syncStorage = ()=>{
        localStorage.setItem('cart', JSON.stringify(this.state.cart));
    }
    // add to cart 
    addToCart=(id)=>{
        let tempCart = [...this.state.cart];
        let tempProduct = [...this.state.storedProducts];
        let tempItem =tempCart.find(item=>item.id===id);
        if(!tempItem){
            tempItem= tempProduct.find(item=>item.id===id);
            let total = tempItem.price;
            let cartItem = {...tempItem, count:1, total};
            tempCart=[...tempCart,cartItem];
        }
        else{
            tempItem.count++;
            tempItem.total = tempItem.price * tempItem.count;
            tempItem.total = parseFloat(tempItem.total.toFixed(2));
        }
        this.setState(()=>{
            return {cart:tempCart}
        },()=>{
            this.addTotals();
            this.openCart();
            this.syncStorage();
        })
    }
    //set single product
    setSingleProduct=(id)=>{
        let product = this.state.storedProducts.find(item=>item.id===id);
        localStorage.setItem('singleProduct',JSON.stringify(product));
        this.setState({singleProduct:{...product},
        loading: false});
    }
    //handle with cart
    handleCart = ()=>{
        this.setState({cartOpen:!this.state.cartOpen})
    }
    //handle with sidebar
    handleSidebar=()=>{
        this.setState({sideBarOpen: !this.state.sideBarOpen})
    }
    //close cart
    closeCart =()=>{
        this.setState({cartOpen: false})
    }
    //open cart
    openCart =()=>{
        this.setState({cartOpen: true})
    }
//cart funksuanality
increment=(id)=>{
    let tempCart = [...this.state.cart];
    let tempItem =tempCart.find(item=>item.id===id);
        tempItem.count++;
        tempItem.total = tempItem.price * tempItem.count;
        tempItem.total = parseFloat(tempItem.total.toFixed(2));
    
    this.setState(()=>{
        return {cart:tempCart}
    },()=>{
        this.addTotals();
        this.syncStorage();
    })

}
//decrement
decrement=(id)=>{
    let tempCart = [...this.state.cart];
    let tempItem =tempCart.find(item=>item.id===id);
    if(tempItem.count > 1){
        tempItem.count--;
        tempItem.total = tempItem.price * tempItem.count;
        tempItem.total = parseFloat(tempItem.total.toFixed(2));
        this.setState(()=>{
            return {cart:tempCart}
        },()=>{
            this.addTotals();
            this.syncStorage();
        })
    } 
    else{
        this.removeItem(id);
    }  
}
//removeItem
removeItem=(id)=>{
let temp = [...this.state.cart];
temp = temp.filter(item=>item.id !==id);
this.setState(()=>{
    return {cart:temp}
},()=>{
    this.syncStorage();
    this.addTotals();
})

}
//clear all
clearCart=()=>{
    this.setState({cart:[]},()=>{
        this.syncStorage();
        this.addTotals();
    })
}
//handle filtering
handleChange =(event)=>{
let target = event.target;
let name = target.name;
let value = target.type==='checkbox'? target.checked : target.value;
this.setState({[name]:value}, this.sortData);
}
sortData=()=>{
    const {storedProducts,price, company,shipping, search} = this.state;
    let tempPrice = parseInt(price);
    let temp =[...storedProducts];
    if(company!=='all'){
        temp = temp.filter(elem=>{
           return  elem.company===company
        })
    }
    temp=temp.filter(elem=> elem.price<=tempPrice);
    if(search) temp=temp.filter(elem=> elem.title.includes(search));
    if(shipping) temp=temp.filter(elem=> elem.freeShipping===true);
    this.setState({filteredProducts:temp})

}
    render(){
        return(
            <ProductContext.Provider value={{...this.state, 
            handleSidebar: this.handleSidebar,
            handleCart: this.handleCart,
            closeCart: this.closeCart,
            openCart : this.openCart,
            addToCart: this.addToCart,
            setSingleProduct : this.setSingleProduct,
            increment : this.increment,
            decrement: this.decrement,
            removeItem: this.removeItem,
            clearCart: this.clearCart,
            handleChange: this.handleChange
            }}>
                    {this.props.children}
            </ProductContext.Provider>
        )
    }
}
const ProductConsumer = ProductContext.Consumer;
export {ProductProvider, ProductConsumer}