const a = [
{
    name: "dungPham",
    age: 21
}, 
{
    name: "unclelake",
    age: 12
}
]

// const b = a.find((temp) => temp.name === "dungPham");
const b = a[0];

console.log(b);

b.name = "Uncl3 L4k3";

console.log(a);
