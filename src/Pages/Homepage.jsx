import AboutSection from '../component/AboutSection';
import Banner from '../component/Banner';
import FeaturedSection from '../component/FeaturedSection';
import LatestPostsSection from '../component/LatestPostsSection';

const Homepage = () => {
    return (
        <div>
            <Banner></Banner>
            <FeaturedSection></FeaturedSection>
            <AboutSection></AboutSection>
            <LatestPostsSection></LatestPostsSection>
        </div>
    );
};

export default Homepage;