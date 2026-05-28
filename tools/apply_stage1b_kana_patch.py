from __future__ import annotations

import json
import re
from pathlib import Path


KANJI_RE = re.compile(r"[\u3400-\u9fff\uf900-\ufaff々〆〇]")


def main() -> None:
    repo_root = Path(__file__).resolve().parents[1]
    cards_path = repo_root / "data" / "cards.stage1b.id.sample.json"
    patch_path = repo_root / "review" / "stage1b_example_kana_patch.json"

    with cards_path.open("r", encoding="utf-8") as cards_file:
        cards = json.load(cards_file)
    with patch_path.open("r", encoding="utf-8") as patch_file:
        patches = json.load(patch_file)

    if not isinstance(cards, list):
        raise ValueError(f"Expected a JSON array in {cards_path}")
    if not isinstance(patches, list):
        raise ValueError(f"Expected a JSON array in {patch_path}")

    cards_by_id = {}
    for card in cards:
        card_id = card.get("id")
        if card_id in cards_by_id:
            raise ValueError(f"Duplicate card id in cards JSON: {card_id}")
        cards_by_id[card_id] = card

    patch_by_id = {}
    for patch in patches:
        patch_id = patch.get("id")
        if patch_id in patch_by_id:
            raise ValueError(f"Duplicate patch id: {patch_id}")
        if "example_kana" not in patch:
            raise ValueError(f"Patch is missing example_kana: {patch_id}")
        patch_by_id[patch_id] = patch["example_kana"]

    missing_ids = [patch_id for patch_id in patch_by_id if patch_id not in cards_by_id]
    if missing_ids:
        raise ValueError(f"Patch ids not found in cards JSON: {', '.join(missing_ids)}")

    applied_count = 0
    for card in cards:
        card_id = card.get("id")
        if card_id not in patch_by_id:
            continue
        example = card.setdefault("example", {})
        if not isinstance(example, dict):
            raise ValueError(f"Card example is not an object: {card_id}")
        example["kana"] = patch_by_id[card_id]
        applied_count += 1

    cards_path.write_text(
        json.dumps(cards, ensure_ascii=False, separators=(",", ":")) + "\n",
        encoding="utf-8",
    )

    kana_values = [
        card.get("example", {}).get("kana", "")
        for card in cards
        if isinstance(card.get("example"), dict) and card.get("example", {}).get("kana")
    ]
    kanji_left = [value for value in kana_values if KANJI_RE.search(value)]

    print(f"patch_count={len(patches)}")
    print(f"applied_count={applied_count}")
    print(f"example_kana_count={len(kana_values)}")
    print(f"example_kana_with_kanji_count={len(kanji_left)}")
    if kanji_left:
        print("example_kana_with_kanji_values:")
        for value in kanji_left:
            print(value)


if __name__ == "__main__":
    main()
