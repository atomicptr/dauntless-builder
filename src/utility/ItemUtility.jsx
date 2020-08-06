import DataUtility from "./DataUtility";

export default class ItemUtility {
    static maxLevel(collection, itemName) {
        if(!itemName || !(collection in DataUtility.data())) {
            return 0;
        }

        let levelKey = null;

        switch(collection) {
            case "weapons": levelKey = "power"; break;
            case "armours": levelKey = "resistance"; break;
        }

        if(!levelKey) {
            return 0;
        }

        return Math.max(...Object.keys(DataUtility.data()[collection][itemName][levelKey]).map(k => Number(k)));
    }

    static levelString(level = 0) {
        let levelString = "";

        if(level && level > 0) {
            levelString = `+${level}`;
        }

        return levelString;
    }

    static isRepeater(item) {
        return item.type === "Repeater";
    }

    static itemType(type) {
        switch(type) {
            case "Weapon":
            case "Sword":
            case "Chain Blades":
            case "Axe":
            case "Hammer":
            case "War Pike":
            case "Repeater":
            case "Aether Strikers":
                return "Weapon";
            case "Head":
            case "Torso":
            case "Arms":
            case "Legs":
                return "Armour";
        }

        return "Lantern";
    }

    static formatWeaponTypeForParts(weaponType) {
        if (!weaponType) {
            return "null";
        }

        return weaponType.toLowerCase().replace(" ", "");
    }

    static tr(collection, itemName) {
        const data = DataUtility.data();

        if(!itemName || !(collection in data)) {
            return null;
        }

        const langData = DataUtility.langGameData();

        if (!(itemName in langData[collection])) {
            return data[collection][itemName];
        }

        return ItemUtility.mergeTranslation(data[collection][itemName], langData[collection][itemName]);
    }

    static mergeTranslation(item, langItem) {
        if ("name" in langItem) {
            item.name = langItem["name"];
        }

        if ("description" in langItem) {
            item.description = langItem.description;
        }

        // TODO: handle unique_effects and lanternAbilities

        return item;
    }

    static trWeapon(itemName) {
        return ItemUtility.tr("weapons", itemName);
    }
}
