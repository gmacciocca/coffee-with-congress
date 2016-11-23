import React from "react";
import classnames from "classnames";

const Section = ({ section, index, expanded, onTitleClick }) => {
    const clNames = classnames("section-slider__item__contents", { "section-slider__item__contents__hidden": !expanded });
    return (
        <div className="section-slider__item">
            <h2 className="section-slider__item__title" onClick={() => onTitleClick(index)}>{section.title}</h2>
            <div className={clNames}>{section.contents}</div>
        </div>
    );
};

class SectionsSlider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sections: props.sections,
            expandedSectionIndex: 0
        };
    }

    onSectionExpand(index) {
        this.setState({ expandedSectionIndex: index });
    }

    render() {
        return (
            <div className={classnames(this.props.clName, "section-slider")}>
                {
                    this.state.sections.map((section, index) => {
                        return (
                            <Section
                                key={section.title}
                                section={section}
                                index={index}
                                expanded={this.state.expandedSectionIndex === index}
                                onTitleClick={this.onSectionExpand.bind(this)}
                            />
                        );
                    })
                }
            </div>
        );
    }
}

export default SectionsSlider;
