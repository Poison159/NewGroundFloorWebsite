
import ServicesCard from './ServicesCard';
import Grid from '@mui/material/Grid';
import CustomAccordion from './CustomAccordion';

export default function Toprow() {

  var cardArray = [
    {
      title: "Apps",
      imgPath: "https://cdn.dribbble.com/userupload/3105308/file/original-e451cc62b520510fe5e166f66791e7fb.png?compress=1&resize=840x630&vertical=to",
      description: "We make mobile apps",
      appItems: [
        { imgPath: "https://img.stackshare.io/service/11331/asp.net-core.png", title: ".Net C#", description: "We use C# for our backend" },
        { imgPath: "https://th.bing.com/th/id/OIP.HLxLvGJV-6r8ZR8AK4F9KAHaEO?pid=ImgDet&rs=1", title: "React", description: "We use react for our frontend" },
        { imgPath: "https://cdn-images-1.medium.com/max/2400/1*FDNeKIUeUnf0XdqHmi7nsw.png", title: "Material ui", description: "We use material ui for our look and feel" }
      ]
    },
    {
      title: "Websites",
      imgPath: "https://cdn.dribbble.com/users/15692/screenshots/1361195/attachments/194237/Flat-Dashboard-UI-real-pix.jpg?compress=1&resize=768x576&vertical=top",
      description: "We make mobile apps",
      appItems: [
        { imgPath: "https://th.bing.com/th/id/OIP.MH2BhO8NKkBEcL7od69hUQHaHa?pid=ImgDet&w=600&h=600&rs=1", title: "Node JS", description: "We use Node js for our backend" },
        { imgPath: "https://th.bing.com/th/id/OIP.CeWz1L1Ekvsg4XnopAtanAHaD4?pid=ImgDet&rs=1", title: "Typescript", description: "We use typescript as a scripting language" },
        { imgPath: "https://th.bing.com/th/id/OIP.Mtw0eaSwwbB7D9-fFPVvcgHaDr?pid=ImgDet&rs=1", title: "Angular", description: "We use angular for our frontend" }
      ]
    },
    {
      title: "Analytics",
      imgPath: "https://th.bing.com/th/id/OIP.1hXL7NbhaoBHaUXd1kXQtAHaHT?pid=ImgDet&rs=1",
      description: "We make mobile apps",
      appItems: [
        { imgPath: "https://th.bing.com/th/id/R.b6eba8a871ac74329c23476c34956333?rik=HvzKZY4W2ZYtbw&pid=ImgRaw&r=0", title: "MySQL", description: "We use MySQL to store & query data" },
        { imgPath: "https://wallpapercave.com/wp/wp8583820.jpg", title: "Python", description: "We use python to shape and anylyze data" },
        { imgPath: "https://th.bing.com/th/id/OIP.uPQgsdWJ0ccnA_j_tZjc9gHaIl?pid=ImgDet&rs=1", title: "Jupyter Notebooks", description: "We use Jupyter to visualize the data" }
      ]
    }
  ]

  return (
    <Grid container spacing={2}>
      {
        cardArray.map((appCard,index) => (
          <Grid key={index} item xs={12} md={4} sm={12}>
            <>
              <ServicesCard
                imgUrl={appCard.imgPath}
                title={appCard.title}
                description={appCard.description}
              />
              <CustomAccordion items={appCard.appItems} />
            </>
          </Grid>
        ))
      }
    </Grid>
  )
}