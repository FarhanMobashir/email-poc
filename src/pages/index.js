import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { use, useEffect, useState } from 'react'
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";



const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [template, setTemplate] = useState('');

  const [introText, setIntroText] = useState('this is intro text')

  let brandData = {
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



      data.template = data.template.replace("This is default text", `${introText}`)
      setTemplate(data.template);
      // insertIntroText(data.template)

    }


    getTemplate()
  }, []);


  // write a function to use the above brandData as {{brandData.brandName}} in the template
  const SimpleHandleBarParser = (template) => {
    let parsedTemplate = template;
    for (let key in brandData) {
      parsedTemplate = parsedTemplate.replace(`{{brandData.${key}}}`, brandData[key]);
    }
    return parsedTemplate;
  }
  
  useEffect(() => {
    // keep the template updated with the intro text
    let introElement = document.getElementById('intro-text-email');
    if (introElement) {
      introElement.innerHTML = SimpleHandleBarParser(introText);
      // introElement.innerHTML = introText;
    }


  },[introText ])


  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            padding: '1rem',
          }}
        >
          <h1 className={styles.title}>
            Sasta Email Template Editor
          </h1>
          <p style={{
            textAlign: 'center',
          }}>
            Get started by editing
          </p>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div>
            <h1>Template</h1>
            <hr/>
            <h4>
              Introduction text
            </h4>
            <hr/>
            <h4
            id="available-data"
            >Available Data to use</h4>
            <ReactTooltip
              anchorId="available-data"
              place="top"
              content={
                <div>
                  {
                    Object.keys(brandData).map((key) => {
                      return (
                        <div
                        key={key}
                        >
                          <span style={{fontWeight: 'bold'}}>{key}</span> : {brandData[key]}
                        </div>
                      )
                    }
                    )
                  }
                  </div>
              }
            />
            <textarea
            value={introText}
            onChange={(e) => {
              console.log(e.target.value)
              setIntroText(e.target.value)
            }}
            style={{
              width: '400px',
              height: '100px',
              padding: '1rem',
              fontSize: '1rem',
            }}
            >
            </textarea>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div dangerouslySetInnerHTML={{ __html: template }} />
          </div>
        </div>

      </main>
    </>
  )
}
