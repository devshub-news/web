import { Chip } from "@material-ui/core";

export const categories = {
    "web": "Web Development",
    "py": "AI and Python",
    "apis": "APIs and Databases",
    "devops": "DevOps",
    "career": "Career and CV",
    "os": "OS and Hardware",
    "other": "Others",
};

export function getChips(classification) {
    let chips = []
    const classificationCategoriesSize = classification.categories !== undefined ? Object.keys(classification.categories).length : 0

    if (classificationCategoriesSize > 0) {
        if (classificationCategoriesSize > 1) {
            chips = [<Chip label={`${categories[classification.principal]} | ${classification.bayes_classification[classification.principal].toFixed(2)}`} color="primary" key={classification.principal} />]
            chips = [...chips, ...Object.entries(classification.bayes_classification).map(([category, percent]) => category !== classification.principal ? (
                <Chip label={`${categories[category]} | ${percent.toFixed(2)}`} color="default" key={category} />
            ) : '')]
        }
        else {
            chips = [<Chip label={categories[classification.principal]} color="primary" key={classification.principal} />]
        }

    }
    else {
        chips = [<Chip label="Other" color="primary" key="other" />]
    }
    return chips
}