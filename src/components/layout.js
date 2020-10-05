import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import { StaticQuery, graphql } from "gatsby";
import { HelmetDatoCms } from "gatsby-source-datocms";

import "../styles/index.sass";

const TemplateWrapper = ({ children }) => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <StaticQuery
      query={graphql`
        query LayoutQuery {
          datoCmsSite {
            globalSeo {
              siteName
            }
            faviconMetaTags {
              ...GatsbyDatoCmsFaviconMetaTags
            }
          }
          datoCmsHome {
            seoMetaTags {
              ...GatsbyDatoCmsSeoMetaTags
            }
            introTextNode {
              childMarkdownRemark {
                html
              }
            }
            copyright
          }
          allDatoCmsSocialProfile(
            filter: { locale: { eq: "en" } }
            sort: { fields: [position], order: ASC}
          ) {
            edges {
              node {
                profileType
                url
                fontawesome
              }
            }
          }
        }
      `}
    render={data => (
        <React.Fragment>
         <div className={`overlay ${showMenu ? "is-open" : ""}`}
           onClick={e => {
              e.preventDefault();
              setShowMenu(!showMenu);
           }}
         />
         <div className={`container ${showMenu ? "is-open" : ""}`}>
           <HelmetDatoCms favicon={data.datoCmsSite.faviconMetaTags} seo={data.datoCmsHome.seoMetaTags}>
             <script src="https://kit.fontawesome.com/6aff6489bc.js" crossorigin="anonymous"></script>    
           </HelmetDatoCms>
           <div className="container__sidebar">
             <div className="sidebar">
               <h6 className="sidebar__title">
                 <Link to="/">{data.datoCmsSite.globalSeo.siteName}</Link>
               </h6>
               <div
                 className="sidebar__intro"
                 dangerouslySetInnerHTML={{
                   __html:
                     data.datoCmsHome.introTextNode.childMarkdownRemark.html
                 }}
               />
               <ul className="sidebar__menu">
                 <li>
                   <Link to="/">work</Link>
                 </li>
                 <li>
                   <Link to="/photolog">photolog</Link>
                 </li>
                 <li>
                   <Link to="/cv">cv</Link>
                 </li>
               </ul>
               <p className="sidebar__social">
                 {data.allDatoCmsSocialProfile.edges.map(({ node: profile }) => (
                   <a
                     key={profile.profileType}
                     href={profile.url}
                     target="blank"
                     className={`social social--${profile.profileType.toLowerCase()}`}
                   >
                    <i className={profile.fontawesome}></i>
                   </a>
                 ))}
               </p>
               <div className="sidebar__copyright">
                 {data.datoCmsHome.copyright}
               </div>
             </div>
           </div>
           <div className="container__body">
             <div className="container__mobile-header">
               <div className="mobile-header">
                 <div className="mobile-header__menu">
                   <a
                     href="#"
                     onClick={e => {
                       e.preventDefault();
                       setShowMenu(!showMenu);
                     }}
                   />
                 </div>
                 <div className="mobile-header__logo">
                   <Link to="/">{data.datoCmsSite.globalSeo.siteName}</Link>
                 </div>
               </div>
             </div>
             {children}
           </div>
         </div>
        </React.Fragment>
      )}
    />
  );
};

TemplateWrapper.propTypes = {
  children: PropTypes.object
};

export default TemplateWrapper;
