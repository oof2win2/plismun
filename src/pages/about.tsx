import React from "react"

export default function About() {
  return (
    <div>
      <h1>This is the about page</h1>
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