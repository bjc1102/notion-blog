export const dbProperty = {
  Slug: {
    id: '%3DD%7D%60',
    name: 'Slug',
    type: 'formula',
    formula: {
      expression: 'join("-", replaceAll(prop("Name"), " ", "-"), id())',
    },
  },
  Updated: {
    id: 'P%5Eya',
    name: 'Updated',
    type: 'last_edited_time',
    last_edited_time: {},
  },
  Number: {
    id: 'VCrp',
    name: 'Number',
    type: 'number',
    number: {
      format: 'number',
    },
  },
  Description: {
    id: 'VUv%5E',
    name: 'Description',
    type: 'rich_text',
    rich_text: {},
  },
  Type: {
    id: '%5CGFL',
    name: 'Type',
    type: 'rich_text',
    rich_text: {},
  },
  Published: {
    id: 'd%40U%5E',
    name: 'Published',
    type: 'checkbox',
    checkbox: {},
  },
  Created: {
    id: 'wf%3BJ',
    name: 'Created',
    type: 'last_edited_time',
    last_edited_time: {},
  },
  Tags: {
    id: '%7Dd~%7D',
    name: 'Tags',
    type: 'multi_select',
    multi_select: {
      options: [
        {
          id: '756c2295-dbb6-4fa0-9f61-cf017459c32e',
          name: 'SQL',
          color: 'default',
        },
        {
          id: 'eaadacea-20b7-4434-8236-d4f2dd48e75d',
          name: '보안',
          color: 'brown',
        },
        {
          id: 'f208b2c4-df7f-43db-8f5b-f9af1c79b18d',
          name: 'React',
          color: 'blue',
        },
        {
          id: '8a4c5c5c-ad4c-4484-a486-5415282efd41',
          name: 'Nextjs',
          color: 'purple',
        },
        {
          id: 'dc189dd6-8fbc-46e3-890b-08394f0842fa',
          name: 'TEST',
          color: 'pink',
        },
        {
          id: 'd4ff58fd-0f8f-4cae-aa9c-075438661a8d',
          name: 'Backend',
          color: 'orange',
        },
        {
          id: '1b4a76e9-56da-47d9-873e-5f1fac6cd8e4',
          name: 'Frontend',
          color: 'yellow',
        },
        {
          id: '8cf9de2f-5acc-429d-adbf-971fadf94097',
          name: '개발상식',
          color: 'green',
        },
      ],
    },
  },
  Name: {
    id: 'title',
    name: 'Name',
    type: 'title',
    title: {},
  },
};

export const getDBPropertyKeys = Object.keys(dbProperty);
