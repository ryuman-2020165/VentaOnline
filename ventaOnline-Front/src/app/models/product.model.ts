export class ProductModel{
    constructor(
        
        public name: string,
        public description: string,
        public brand: string,
        public price: number,
        public stock: number,
        public sales: number,
        public category: string
    ){}

}