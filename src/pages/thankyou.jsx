import { useEffect, useState } from "react";
import handlebars from 'handlebars/dist/cjs/handlebars'


function slugify() {
    var text = "Hello World";
    var slug = text
        .toString()
        .toLowerCase()
        .replace(/\s+/g, "-") // Replace spaces with -
        .replace(/[^\w-]+/g, "") // Remove all non-word chars
        .replace(/--+/g, "-") // Replace multiple - with single -
        .replace(/^-+/, "") // Trim - from start of text
        .replace(/-+$/, ""); // Trim - from end of text
    // console.log(slug);
    return slug;
}
export default function ThankYou() {
    let brandData = {};
    const [template, setTemplate] = useState('');
    useEffect(() => {
        const getTemplate = async () => {
            const res = await fetch('/api/get-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    {
                        "brandName": "Nutr",
                        "firstName": "Mohit",
                        "image1": "https://res.cloudinary.com/dqsbiaqqj/image/upload/v1677667756/common/Group_1000002675_aigpqs.png",
                        "image2": "https://brand-templates-data-prod.s3.us-east-2.amazonaws.com/Nutr/NutrImage2.png",
                        "image3": "https://brand-templates-data-prod.s3.us-east-2.amazonaws.com/Nutr/NutrImage3.png",
                        "brandLogo": "https://res.cloudinary.com/dqsbiaqqj/image/upload/v1677667625/common/Nutr_x_youshd_sx079u.png",
                        "combinedLogo": "https://res.cloudinary.com/dqsbiaqqj/image/upload/v1677667625/common/Nutr_x_youshd_sx079u.png",
                        "shopUrl": "https://thenutr.com/",
                        "productDescription": "Best product of the world",
                        "rewardsCPC": 1,
                        "rewardsCPC100": 100,
                        "rewardsMaximum": 1000,
                        "instagramHandle": "realnutr",
                        "tiktokHandle": "tiktoknutr",
                        "instagram": true,
                        "bgColor": "wheat",
                        "textColor": "maroon",
                        "buttonColor": "maroon",
                        "LINKCOLOR": "blue",
                        // editable text
                        "introText": "This is default text",
                    }
                ),
            })

            const data = await res.json();


            let bare = data.bareTemplate;

            // // compile the template with handlebars
            // const bareTemplate = handlebars.compile(bare)
            // console.log(bareTemplate({
            //   ...brandData
            // }))

            // data.template = data.template.replace("This is default text", `${introText}`)
            setTemplate(data.bareTemplate);


        }


        getTemplate()
    }, []);

    function renderTemplate() {
        return {
            __html: handlebars.compile(template)(
                {
                    brandName : "Nutr",
                    instaStory: true,
                    maxIncentive : 1000,
                    productImage: "https://res.cloudinary.com/dqsbiaqqj/image/upload/v1684685644/common/pexels-arthouse-studio-6017742_2_w8lanr.png"
                }
            )
        };
    }

    return (
        <div>
            <h1>Thank you!</h1>
            <p>This is a custom thank you page for form submissions</p>
            <div dangerouslySetInnerHTML={
                renderTemplate()
            } />
        </div>
    )
}