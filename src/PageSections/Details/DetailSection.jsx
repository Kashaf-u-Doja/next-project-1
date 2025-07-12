import React from "react";

function DetailSection() {
  return (
    <>
      <section className="details">
        <div className="sectionBoxColored">
          <h4 className="homeChallenge">Frontend Take Home Challenge</h4>
          <p>
            Welcome to the take-home challenge for the Frontend web developer
            position, We are excited to son your skills and experience in
            action, The challenge is to create the user interface for a news
            aggregator website that pulls articles from various sources and
            displays them in a clean thay to mad format
          </p>
        </div>

        <div className="sectionBox">
          <h4>Requirements</h4>
          <div className="requirements">
            <ol>
              <li>
                Article search and filtering Users sisocio be able to search for
                articles by kooyword and hear the results by date, category and
                source.
              </li>
              <li>
                {" "}
                Personalized news feed Users should be able lo cuslorrize their
                news feed by selecting their preferred sources. categories, and
                authors.
              </li>
              <li>
                Mobie-responsive desigt The webate should be opt meed for wowing
                or mobile devices.
              </li>
            </ol>
          </div>
        </div>

        <div className="sectionBox">
          <h4>Data Sources That Can Be Used (Choose At Least 3)</h4>
          <div className="dataSource">
            <ol>
              <li>
                NewsAPI: This is a comprehensive AP that allows developers to
                access articles fromr mere than 70:000 news sources, including
                rigor newspapers magazines, and blogs. The API provides access
                to articles in various
              </li>
              <li>
                OpenNew: This AP provides access to a wide range of news content
                from various sources including newspapers magazines, afel blogs.
                It alitas developers to retrieve artetes brsec. on keywords
                caleyerims.
              </li>
              <li>
                Newstired: The NewsCice API prevides access to a wide range of
                rows content from various sources, neluding newspapers magaenes,
                and blogs. The API allows developers lu retrieve articles based
                un keywords. categores and sourcer, as well as 30 search for
                articles by autor publication and topic
              </li>
              <li>
                The Guardian: This AMI atours developers to necess articles from
                The Guardian newspaper: 00 cf sia moit respected news sources in
                the world. The API provides access to articles in various
                categories and support search ard filtering.
              </li>
              <li>
                New York Times: This API a Dura develope's to access a actos
                front The New York Tirses, ore of the most respected news
                sources in the world. The API provides access to anides is
                various categories and support search ard filtering.
              </li>
              <li>
                BBC News: This AP allows dewitoperi to access news from BUC News
                ore o' the most trusted news sources in the world. t proveles
                access to articles in various categorias and supports search and
                fitaring
              </li>
              <li>
                NewsAPtorg: This AP prov des access to news articles from
                thousands of sources, including news publications blogs and
                megaines. It allows developers to retrieve art cies besedfor
                keywords categories and sources.
              </li>
            </ol>
          </div>
        </div>

        <div className="sectionBox">
          <h4>Challenge Guidelines</h4>
          <div className="challengeGuidliens">
            <ol>
              <li>
                The output expocted from this challenge sa front end preject
                using <strong>Reactjs with Typescript</strong>
              </li>
              <li>
                You are free to choose at least three cela sources from the
                provided list to fetch articles for your www.
              </li>
              <li>
                Ensure the frontend application is containerized with Docker and
                includes clear documentation on running the project within a
                Docker container.
              </li>
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}

export default DetailSection;
