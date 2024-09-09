export const links = [
    { href: "#", text: "Collections" },
    { href: "#", text: "Men" },
    { href: "#", text: "Women" },
    { href: "#", text: "About" },
    { href: "#", text: "Contact" },
];

export const productInfo = {
    company: "Sneaker Company",
    title: "Fall Limited Edition Sneakers",
    description:
        "These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they'll withstand everything the weather can offer.",
    originalPrice: 250.0,
    discountedPrice: 125.0,
    discountPercentage: "50%",
};
export const productImages = [
    {
        url: "/images/1.jpg",
    },
    {
        url: "/images/2.jpg",
    },
    {
        url: "/images/3.jpg",
    },
    {
        url: "/images/default-image.png",
    },
];

export const productThumbnails = [
    {
        url: "/images/1.jpg",
    },
    {
        url: "/images/2.jpg",
    },
    {
        url: "/images/3.jpg",
    },
    {
        url: "/images/default-image.png",
    },
];

export const formatCurrency = (amount) => {
    return "$" + amount.toFixed(2);
};