import SectionImageText from "../blocks/sectionImageText";
import RelationLists from "../blocks/list/list_postypes";
import ListFeatures from "../blocks/list/list_features";
import SectionText from "../blocks/sectionText";
import Accordion from "../blocks/accordion";

export default function ComponentAdapter(props) {
    const { data, typename } = props

    switch (typename) {
        case 'BlocksContentSectionImageTexteLayout':
            return (<SectionImageText text={data.text} image={data.image} direction={data.direction} />)
        case 'BlocksContentRelationListsLayout':
            return (<RelationLists text={data.text} postypes={data.postType?.nodes} />)
        case 'BlocksContentFeaturesListsLayout':
            return (<ListFeatures text={data.text} listImage={data.listImage} listText={data.listText} direction={data.direction} />)
        case 'BlocksContentSectionTextLayout':
            return (<SectionText text={data.text} />)
        case 'BlocksContentSectionAccordionLayout':
            return (<Accordion text={data.text} accordion={data.accordion} />)
    }
}