import Image from "next/image"

type HeaderProps =
  | {
      title?: undefined
      mainPage: true
    }
  | {
      title: string
      mainPage?: undefined
    }

export default ({ title, mainPage }: HeaderProps) => {
  return (
    <section
      className="c-hero"
      style={{ paddingBottom: mainPage ? "12vh" : "18vh" }}
    >
      <div className="container">
        <div className="bgWrap">
          <Image
            src={
              mainPage
                ? "/images/school_img2.jpg"
                : "/images/school_imgheader.jpg"
            }
            layout={mainPage ? "fill" : "responsive"}
            height={mainPage ? undefined : "36vh"}
            width={"100vw"}
            objectFit="cover"
            className="backgroundImage"
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            alignItems: "center",
            paddingTop: "16rem",
          }}
          className="page animate"
        >
          {mainPage ? (
            <>
              <Image src="/logolarge.png" height={350} width={350} />
              <h1 style={{ color: "white" }}>JANUARY 26TH - 29RD, 2023</h1>
            </>
          ) : (
            <h1>{title}</h1>
          )}
        </div>
      </div>
    </section>
  )
}
