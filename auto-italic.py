import streamlit as st
import docx
from docx.shared import Pt
from kbbi import KBBI


def is_foreign(word):
    try:
        KBBI(word)
        return False
    except:
        return True


def italic_foreign_words(doc):
    for paragraph in doc.paragraphs:
        for run in paragraph.runs:
            words = run.text.split()
            for i, word in enumerate(words):
                if is_foreign(word):
                    run.italic = True
            run.text = ' '.join(words)
    return doc


def main():
    st.title("Automatic Italic the Foreign Words")
    st.write("Upload (.docx)")
    uploaded_file = st.file_uploader("Choose a file", type="docx")
    if uploaded_file:
        doc = docx.Document(uploaded_file)
        doc = italic_foreign_words(doc)
        updated_file_path = f"updated_{uploaded_file.name}"
        doc.save(updated_file_path)

        st.write("Download updated document:")
        st.download_button(
            label="Download",
            data=open(updated_file_path, "rb").read(),
            file_name=updated_file_path,
            mime="application/octet-stream"
        )


if __name__ == "__main__":
    main()
