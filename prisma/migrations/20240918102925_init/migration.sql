-- CreateTable
CREATE TABLE `Product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `productRating` DOUBLE NOT NULL,
    `offerExpires` DATETIME(3) NOT NULL,
    `measurement` VARCHAR(191) NOT NULL,
    `productOff` VARCHAR(191) NOT NULL,
    `originalPrice` DOUBLE NOT NULL,
    `offerPrice` DOUBLE NOT NULL,
    `productCategory` VARCHAR(191) NOT NULL,
    `isNewProduct` BOOLEAN NOT NULL,
    `productImages` JSON NOT NULL,
    `color` JSON NOT NULL,
    `reviews` JSON NOT NULL,
    `productDescription` VARCHAR(191) NULL,
    `additionalInfo` JSON NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
