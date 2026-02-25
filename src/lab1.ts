interface User {
    id: number;
    name: string;
    email?: string | undefined;
    isActive: boolean;
}

function createUser(id: number, name: string, email?: string, isActive: boolean = true): User {
    return {
        id,
        name,
        email,
        isActive
    };
}

type Genre = 'fiction' | 'non-fiction';

interface Book {
    title: string;
    author: string;
    year?: number;
    genre: Genre;
}

function createBook(book: Book): Book {
    return book;
}

const bookWithYear = createBook({
    title: "1984",
    author: "Джоржд Оруэлл",
    year: 1948,
    genre: "fiction"
});

const bookWithoutYear = createBook({
    title: "Слово о полку Игореве",
    author: "Аноним",
    genre: "fiction"
});

function calculateArea(shape: 'circle', radius: number): number;
function calculateArea(shape: 'square', side: number): number;
function calculateArea(shape: 'circle' | 'square', param: number): number {
    if (shape === 'circle') {
        return Math.PI * param * param;
    } else {
        return param * param;
    }
}

type Status = 'active' | 'inactive' | 'new';

function getStatusColor(status: Status): string {
    switch (status) {
        case 'active':
            return 'green';
        case 'inactive':
            return 'red';
        case 'new':
            return 'blue';
        default:
            return 'gray';
    }
}

type StringFormatter = (str: string, uppercase?: boolean) => string;

const capitalizeFirstLetter: StringFormatter = (str, uppercase = false) => {
    let result = str.charAt(0).toUpperCase() + str.slice(1);
    if (uppercase) {
        result = result.toUpperCase();
    }
    return result;
};

const trimAndFormat: StringFormatter = (str, uppercase = false) => {
    let result = str.trim();
    if (uppercase) {
        result = result.toUpperCase();
    }
    return result;
};

function getFirstElement<T>(arr: T[]): T | undefined {
    return arr.length > 0 ? arr[0] : undefined;
}

const numbers = [1, 2, 3, 4, 5];
const strings = ['яблоко', 'бургер', 'вишня'];
const emptyArray: number[] = [];

const firstNumber = getFirstElement(numbers);
const firstString = getFirstElement(strings);
const firstEmpty = getFirstElement(emptyArray);

interface HasId {
    id: number;
}

function findById<T extends HasId>(items: T[], id: number): T | undefined {
    return items.find(item => item.id === id);
}

interface Product extends HasId {
    name: string;
    price: number;
}
