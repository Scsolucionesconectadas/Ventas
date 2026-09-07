from pathlib import Path

from PIL import Image, ImageOps


IMAGE_DIR = Path(__file__).resolve().parents[1] / "assets" / "img"
SOURCE_NAMES = (
    "landing-hero.jpg",
    "medical-hero.jpg",
    "medical-demo.jpg",
    "hospitality-demo.jpg",
    "real-estate-demo.jpg",
    "materials-demo.jpg",
    "gastronomy-demo.jpg",
    "education-demo.jpg",
    "tires-demo.jpg",
    "survey-demo.jpg",
    "logistics-demo.jpg",
    "tires-team-demo.jpg",
    "survey-team-demo.jpg",
    "logistics-team-demo.jpg",
)
MAX_WIDTH = 1600
WEBP_QUALITY = 84


def optimize_image(source_path: Path) -> tuple[Path, int, int]:
    output_path = source_path.with_suffix(".webp")
    original_size = source_path.stat().st_size

    with Image.open(source_path) as source:
        image = ImageOps.exif_transpose(source).convert("RGB")
        if image.width > MAX_WIDTH:
            target_height = round(image.height * MAX_WIDTH / image.width)
            image = image.resize((MAX_WIDTH, target_height), Image.Resampling.LANCZOS)
        image.save(output_path, "WEBP", quality=WEBP_QUALITY, method=6)

    return output_path, original_size, output_path.stat().st_size


def main() -> None:
    original_total = 0
    optimized_total = 0

    for name in SOURCE_NAMES:
        source_path = IMAGE_DIR / name
        if not source_path.exists():
            raise FileNotFoundError(f"No se encontró la imagen fuente: {source_path}")

        output_path, original_size, optimized_size = optimize_image(source_path)
        original_total += original_size
        optimized_total += optimized_size
        reduction = 100 * (1 - optimized_size / original_size)
        print(f"{output_path.name}: {original_size} -> {optimized_size} bytes ({reduction:.1f}% menos)")

    total_reduction = 100 * (1 - optimized_total / original_total)
    print(f"Total: {original_total} -> {optimized_total} bytes ({total_reduction:.1f}% menos)")


if __name__ == "__main__":
    main()
