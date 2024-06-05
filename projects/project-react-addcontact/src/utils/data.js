import DimasImage from "../assets/images/dimasmds.jpeg";
import ArifImage from "../assets/images/arifaizin.jpeg";
import RahmatImage from "../assets/images/rfajri27.jpeg";

const getData = () => {
  return [
    {
      id: 1,
      name: "Dimas Saputra",
      tag: "dimasmds",
      imageUrl: DimasImage,
    },
    {
      id: 2,
      name: "Arif Faizin",
      tag: "arifaizin",
      imageUrl: ArifImage,
    },
    {
      id: 3,
      name: "Rahmat Fajri",
      tag: "rfajri27",
      imageUrl: RahmatImage,
    },
  ];
};

export { getData };
