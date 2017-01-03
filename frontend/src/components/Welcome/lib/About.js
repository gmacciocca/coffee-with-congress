import React from "react";
import { Application } from "solo-application";
import Footer from "./Footer";
import Avatar from "material-ui/Avatar";
import List from "material-ui/List/List";
import ListItem from "material-ui/List/ListItem";
import { AboutText, aboutPeople } from "./aboutPeople";

// class UserProfile extends React.Component {
//     constructor(...args) {
//         super(...args);
//         this._gravatar = Application.roles.gravatar;
//         this.state = {
//             name: this.props.person.name,
//             bio: null,
//             photoUrl: this.props.person.photoUrl
//         };
//     }
//
//     // componentWillMount() {
//     //     this._gravatar.fetchUserInfo(this.props.emailHash)
//     //     .then(userInfo => {
//     //         this.setState(...userInfo);
//     //     });
//     // }
//
//     render() {
//         return (
//             <ListItem
//                 key={this.state.name}
//                 disabled={true}
//                 leftAvatar={<Avatar src={this.state.photoUrl} />}
//             >
//                 <div>{this.state.name}</div>
//                 <div>{this.state.bio}</div>
//             </ListItem>
//         );
//     }
// }

export default class About extends React.Component {
    constructor(...args) {
        super(...args);
        this.appHeader = Application.roles.uiAppHeader;
    }

    render() {
        const AppHeader = this.appHeader;

        return (
            <div className="mission">
                <AppHeader
                    router={this.props.router}
                />
                <div className="mission__wrapper" >
                    <h3>{Application.localize("footer/aboutUs")}</h3>
                    <AboutText />
                    <List>
                        {aboutPeople.map(person => {
                            //const BioComponent = person.bioComponent;
                            return (
                                <ListItem
                                    key={person.name}
                                    disabled={true}
                                    leftAvatar={<Avatar src={person.photoUrl} />}
                                >
                                    <div className="welcome__about-person-name">{person.name}</div>
                                    {person.bioComponent}
                                </ListItem>
                            );
                        })}
                    </List>
                </div>
                <Footer />
            </div>
        );
    }
}
