import argparse
import os
import shutil
import subprocess
import tempfile


def run_code(path: str) -> None:
    """Execute code based on the file extension."""
    ext = os.path.splitext(path)[1].lower()

    if ext == ".py":
        subprocess.run(["python3", path], check=True)
    elif ext == ".js":
        subprocess.run(["node", path], check=True)
    elif ext in {".c", ".cpp", ".cxx", ".cc"}:
        compiler = "gcc" if ext == ".c" else "g++"
        with tempfile.TemporaryDirectory() as tmp:
            executable = os.path.join(tmp, "a.out")
            subprocess.run([compiler, path, "-o", executable], check=True)
            subprocess.run([executable], check=True)
    elif ext == ".cs":
        if shutil.which("mcs") is None:
            raise EnvironmentError("C# compiler 'mcs' not found")
        with tempfile.TemporaryDirectory() as tmp:
            exe = os.path.join(tmp, "program.exe")
            subprocess.run(["mcs", path, f"-out:{exe}"], check=True)
            subprocess.run(["mono", exe], check=True)
    elif ext in {".html", ".htm"}:
        print(f"Open {path} in a web browser to view the output.")
    else:
        raise ValueError(f"Unsupported file extension: {ext}")


def main() -> None:
    parser = argparse.ArgumentParser(description="Preview output of various code files")
    parser.add_argument("file", help="Path to the code file")
    args = parser.parse_args()

    run_code(args.file)


if __name__ == "__main__":
    main()
