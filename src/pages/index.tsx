import React from "react"
import Image from "next/image"
import { ParagraphTypography } from "@utils/styles"

export default function Home() {
  return (
    <div style={{
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			flexDirection: "column"
		}}>
			<section>
				<Image
					src="/logolarge.png"
					height={350}
					width={350}
				/>
				<ParagraphTypography>JANUARY 20TH - 23RD, 2022</ParagraphTypography>
			</section>
    </div>
  )
}

// this makes the page render only once on server startup, which is good for SEO + performance
// makes TTFB faster since the page is just sent immediately after the request rather than rendering it
export function getStaticProps() {
	return {
		props: {}
	}
}