import style from './side_navbar.module.css';
import ExtendableMenu from './extendable_menu';

/**
 * Render a navbar. You can send different types of items, just make sure that they are well formatted.
 * @param {Array<object>} items - An array of objects containing the name and link of each item.
 * @param {string} items[].type - A string representing the type of the item.
 * @param {string} items[].name - A string with the name of the item.
 * @param {string} items[].link - If the type is "link", this string will be the link of the item.
 * @param {Array<object>} items[].items - if the type is "dropdown", this array of objects will be the dropdown links.
 * @param {string} items[].items[].name - A string with the name of the dropdown item.
 * @param {string} items[].items[].link - a string with the link of the dropdown item.
 */
export default function SideNavbar ({items, isSideMenuOpen}) {
    if (!Array.isArray(items) || items.length === 0) {
        items = [];
    };

    return (
        <div className={`${style.navbar} ${isSideMenuOpen ? '' : style.inactive}`}>
            {items.map((item, i) => {
                if (item.link) {
                    return (
                        <a key={i} href={item.link} className={`${style.link}`}>{item.name}</a>
                    )
                } else if (item.items) {
                    return (
                        <ExtendableMenu key={item.name + i} name={item.name} isSideMenuOpen={isSideMenuOpen}>
                            {item.items.map((item, j) => {
                                return (
                                    <a key={i + j} href={item.link} className={`${style.link}`}>{item.name}</a>
                                )
                            })}
                        </ExtendableMenu>
                    )
                }
            })}
        </div>
    )
};