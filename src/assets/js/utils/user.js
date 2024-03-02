const isCompany = () =>{
    console.log(sessionStorage.getItem("user"))
    return sessionStorage.getItem("user") === '公司';
}
export { isCompany }