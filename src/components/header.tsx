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

// TODO: better looks on mobile

export default ({ title, mainPage }: HeaderProps) => {
  return (
    <section style={{ paddingBottom: "12vh" }}>
      <div
        className="container"
        style={{
          width: "100vw",
          height: "40vh",
          paddingBottom: mainPage ? "70vh" : "40vh",
        }}
      >
        <div
          className="bgWrap"
          style={{
            height: mainPage ? "70vh" : "40vh",
          }}
        >
          <Image
            src={
              mainPage
                ? "/images/school_img2.jpg"
                : "/images/school_imgheader.jpg"
            }
            layout="fill"
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
            paddingTop: "16vh",
            verticalAlign: "sub",
            position: "absolute",
            left: 0,
            width: "100vw",
            justifyContent: "center",
            maxWidth: "100vw",
          }}
          className="page animate"
        >
          {mainPage ? (
            <>
              <Image src="/images/logolarge.png" height={350} width={350} />
              <h1 style={{ color: "white" }}>JANUARY 26TH - 29RD, 2023</h1>
            </>
          ) : (
            <h1 style={{ color: "white" }}>{title}</h1>
          )}
        </div>
      </div>
    </section>
  )
}
