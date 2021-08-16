import kidney_img from "../images/logo/lms/kidney.jpeg";
import surgery_img from "../images/logo/lms/surgery.jpeg";
import general_med_img from "../images/logo/lms/general_med.jpeg";
import urology_img from "../images/logo/lms/urology.jpeg";
import ent_img from "../images/logo/lms/ent.jpeg";
import womens_img from "../images/logo/lms/womens.jpeg";
import mental_img from "../images/logo/lms/mental.jpeg";
import endocrine_img from "../images/logo/lms/endocrine.jpeg";

const data = [{
        id: 11,
        category: 'Surgery',
        title: 'Study of Surgery',
        description: "the branch of medical practice that treats injuries, diseases, and deformities by the physical removal, repair, or readjustment of organs and tissues, often involving cutting into the body.",
        imageURL: surgery_img,
    },
    {
        id: 12,
        category: 'General Medicine',
        title: 'Study of General Medicine',
        description: "the branch of medicine that deals with the diagnosis and (nonsurgical) treatment of diseases of the internal organs (especially in adults)",
        imageURL: general_med_img,
    },
    {
        id: 13,
        category: 'Kidney',
        title: 'Study of Kidney',
        description: 'Human kidneys are shaped like large beans, and this is where the "kidney bean," a common red-colored bean, gets its name. The organs called kidneys are vital to life, as they filter bad stuff from your blood, help your body get rid of waste, regulate your blood pressure, and even produce hormones. The word kidney is probably a compound of the Old English cwið, "womb," and ey, "egg," describing the organ\'s shape.',
        imageURL: kidney_img,
    },
    {
        id: 14,
        category: 'Ear, Nose, Throat',
        title: 'Study of Ear, Nose, Throat',
        description: "Jcalled otolaryngology-head and neck surgery because specialists are trained in both medicine and surgery. An otolaryngologist is often called an ear, nose, and throat doctor, or an ENT for short.",
        imageURL: ent_img,
    },
    {
        id: 15,
        category: 'Endocrinology',
        title: 'Study of the Endocrine System',
        description: "Endocrinologists are doctors who specialize in glands and the hormones they make. They deal with metabolism, or all the biochemical processes that make your body work, including how your body changes food into energy and how it grows.",
        imageURL: endocrine_img,
    },
    {
        id: 16,
        category: 'Urology',
        title: 'Study of Kidney and the Urine Function',
        description: "JavaScript is one of the most ubiquitous programming languages on the planet, mostly because it's the backbone of interactive web applications. On top of that, JavaScript is a great language for beginners because it gives them a chance to write code that does something visual, which is exciting and helpful when you're just getting started as a programmer. Dynamic content is the hot topic in web development right now. Dynamic content refers to content that constantly changes and adapts to specific users whenever possible. For example, JavaScript can be used to determine if a website visitor is using a computer or a mobile device before deciding whether or not to render the mobile version of the website. It's these small things behind the scenes that create genuine value in using JavaScript to create dynamic web pages.",
        imageURL: urology_img,
    },
    {
        id: 17,
        category: 'Mental Health',
        title: 'Study of Mental Health',
        description: "Psychopathology is a term which refers to either the study of mental illness or mental distress or the manifestation of behaviours and experiences which may be indicative of mental illness or psychological impairment. The many different professions may be involved in studying mental illness or distress.",
        imageURL: mental_img,
    },
    {
        id: 18,
        category: 'Womens Health',
        title: 'Study of Womens Health',
        description: "Women's health refers to the branch of medicine that focuses on the treatment and diagnosis of diseases and conditions that affect a woman's physical and emotional well-being.",
        imageURL: womens_img,
    },
];
export default data;
