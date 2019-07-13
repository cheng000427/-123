$(()=>{

    let arr=kits.loadArray('cartDate');
    let total=0;
    arr.forEach(e => {
        total+=e.number
    });
    $('count').text(total);
})