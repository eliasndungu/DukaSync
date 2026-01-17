import os
from collections import defaultdict

def analyze_file(file_path):
    """
    Analyze a single file:
    - lines
    - words
    - characters
    """
    lines = 0
    words = 0
    chars = 0

    try:
        with open(file_path, 'r', errors='ignore') as f:
            for line in f:
                lines += 1
                chars += len(line)
                # Split on whitespace for word count
                words += len(line.split())

        return {
            "lines": lines,
            "words": words,
            "chars": chars,
        }
    except IOError as e:
        print(f"Error reading file {file_path}: {e}")
        return {
            "lines": 0,
            "words": 0,
            "chars": 0,
        }

def analyze_folder(folder_path, extensions=None, print_summary=True):
    """
    Recursively analyze all files in a folder,
    optionally filtering by file extensions (e.g., ['.py', '.txt']).

    Returns a dict:
    {
        "global_totals": {
            "files": int,
            "lines": int,
            "words": int,
            "chars": int,
        },
        "by_extension": {
            ".py": {
                "files": int,
                "lines": int,
                "words": int,
                "chars": int,
            },
            ...
        }
    }
    """
    global_totals = {
        "files": 0,
        "lines": 0,
        "words": 0,
        "chars": 0,
    }

    by_extension = defaultdict(lambda: {
        "files": 0,
        "lines": 0,
        "words": 0,
        "chars": 0,
    })

    for root, dirs, files in os.walk(folder_path):
        # Skip common dirs
        dirs[:] = [d for d in dirs if d not in {'venv', '.git', '__pycache__', 'node_modules'}]

        for file_name in files:
            # Skip hidden files
            if file_name.startswith('.'):
                continue

            file_path = os.path.join(root, file_name)

            if extensions is None or file_name.endswith(tuple(extensions)):
                ext = os.path.splitext(file_name)[1] or "<no_ext>"

                stats = analyze_file(file_path)
                global_totals["files"] += 1
                global_totals["lines"] += stats["lines"]
                global_totals["words"] += stats["words"]
                global_totals["chars"] += stats["chars"]

                by_extension[ext]["files"] += 1
                by_extension[ext]["lines"] += stats["lines"]
                by_extension[ext]["words"] += stats["words"]
                by_extension[ext]["chars"] += stats["chars"]

    result = {
        "global_totals": global_totals,
        "by_extension": dict(by_extension),  # convert defaultdict to normal dict
    }

    if print_summary:
        print("\n=== Global Totals ===")
        print(f"Files: {global_totals['files']}")
        print(f"Lines: {global_totals['lines']}")
        print(f"Words: {global_totals['words']}")
        print(f"Characters: {global_totals['chars']}")

        print("\n=== By Extension ===")
        for ext, stats in sorted(result["by_extension"].items()):
            print(f"\nExtension: {ext}")
            print(f"  Files: {stats['files']}")
            print(f"  Lines: {stats['lines']}")
            print(f"  Words: {stats['words']}")
            print(f"  Characters: {stats['chars']}")

    return result


# --- Example Usage ---
if __name__ == "__main__":
    target_directory = '.'

    file_extensions_to_count = [
        ".py", ".js", ".tsx",".jsx",".kt", ".kts", ".sh", ".html", ".nix", ".md", ".txt",
        ".json", ".yaml", ".yml", ".xml", ".css", ".scss", ".java", ".c",
        ".cpp", ".h", ".cs",
    ]

    results = analyze_folder(target_directory, extensions=file_extensions_to_count)
    # You now have a dict in `results` that you can use programmatically
    # e.g., print(results), write to JSON, etc.