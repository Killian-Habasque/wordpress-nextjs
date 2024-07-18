import SectionImageText from "../sectionImageText";

export default function ComponentAdapter(props) {
    const { data, component } = props
    console.log(data)
    console.log(component)

    switch (component) {
        case 'BlocksContentSectionImageTexteLayout':
            return (<SectionImageText data={data} />)
    }

}