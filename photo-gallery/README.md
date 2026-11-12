# Photo Gallery

A React-based single-page photo gallery that displays photos in a single-column feed with infinite scrolling and interactive like buttons.

## Features

- Displays photos with author information.
- Fetches photo data from a paginated API.
- Automatically loads more photos when scrolling near the bottom.
- Includes a thumbs-up button for every photo.
- Like counts increase with every click.
- Responsive layout for different screen sizes.
- Displays loading and error messages.

## Tech Stack

- React.js
- JavaScript
- CSS
- Vite
- Font Awesome
- Picsum Photos API (primary data source)

## Getting Started

Clone the repository:

```bash
git clone https://github.com/vrinda-code/react-assignments.git
```

Navigate to the project:

```bash
cd react-assignments/photo-gallery/frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL displayed in the terminal.

## API Integration

The application uses the JSONPlaceholder Photos API to retrieve paginated photo data.

- Fetches photos page by page.
- Displays photo titles and images.
- Loads additional photos automatically while scrolling.

## Implementation Notes

- React hooks manage photo data, loading states and like counts.
- IntersectionObserver detects when the user approaches the bottom of the gallery.
- Like counts increase independently for each photo.
- Data and likes are maintained in component state.