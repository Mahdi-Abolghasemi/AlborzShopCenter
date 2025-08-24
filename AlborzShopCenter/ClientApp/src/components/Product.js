import React, { Component } from "react";
import { RestDataSource } from "./RestDataSource";
import { PaginationControls } from "./PaginationControls";
import Modal from "react-bootstrap/Modal";
import { ModalBody } from "react-bootstrap";
import { v4 } from "uuid";
import { ProductSizeTypeEnum } from "../Enumeration/ProductSizeTypeEnum";

// import { Products, Groups, Shops, Brands } from "./Data";

export class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      rows: [],
      columns: [],
      colors: [],
      newColor: { id: "", color: "", inventory: 0, price: "" },
      editColor: { id: "", color: "", inventory: 0, price: "" },
      sizes: [],
      newSize: { id: "", title: "", colorId: "", inventory: 0, price: "" },
      editSize: { id: "", title: "", colorId: "", inventory: 0, price: "" },
      shops: [],
      brands: [],
      groups: [],
      activeShops: [],
      activeBrands: [],
      activeGroups: [],
      selectFile: null,
      folderName: "",
      listOfImages: [],
      oneAttribute: { id: 0, title: "", value: "" },
      attributes: [],
      formData: {
        id: 0,
        name: "",
        deleted: 0,
        active: 1,
        descriptions: "",
        folderName: "",
        images: [],
        attributes: [],
        colors: [],
        model: "",
        price: "0",
        brandId: 0,
        brandName: "",
        shopId: 0,
        shopName: "",
        totalInventory: 0,
        groupId: 0,
        groupName: "",
        hasSize: 0,
        sizeType: 0,
        sizes: [],
      },
      searchData: {
        name: "",
        model: "",
        active: -1,
        brandId: -1,
        shopId: -1,
        groupId: -1,
      },
      showMainPage: 1,
      showSavePage: 0,
      showDetailPage: 0,
      result: "",
      showDeleteModal: 0,
      deleteData: { id: "", name: "" },
      sort: "Name",
      pageCount: 0,
      pageSizes: [4, 8, 16, 100],
      perPage: 4,
      offset: 0,
      currentPage: 1,
      fieldValidations: {
        name: true,
        shopId: true,
        brandId: true,
        groupId: true,
      },
      fieldSizeValidations: {
        sizeType: true,
        title: true,
        divColorSize: true,
        inventory: true,
        price: true,
        btnAddSize: true,
        editInventory: true,
        editPrice: true,
      },
      fieldColorValidations: {
        divColorSelected: true,
        newInventory: true,
        newPrice: true,
        editInventory: true,
        editPrice: true,
      },
      cardTitle: "New a product",
      showInventoryModal: 0,
      showSizeInventoryModal: 0,
      elementsSettings: {
        slcHasSize: false,
        slcSizeType: true,
        txtSizesTitle: true,
        lblColorForSize: true,
        txtSizesInventory: true,
        txtSizePrice: true,
        btnAddSize: true,
        detailsColorModal: false,
        detailsSizeModal: false,
      },
    };

    this.dataSource = new RestDataSource("Products");
    this.shopDataSource = new RestDataSource("Shops");
    this.brandDataSource = new RestDataSource("Brands");
    this.groupDataSource = new RestDataSource("Groups");
  }

  componentDidMount = () => {
    this.dataSource.GetAll((res) => this.setState({ data: res }));
    this.shopDataSource.GetAll((res) => this.setState({ shops: res }));
    this.brandDataSource.GetAll((res) => this.setState({ brands: res }));
    this.groupDataSource.GetAll((res) => this.setState({ groups: res }));

    // this.setState({
    //   data: Products,
    //   groups: Groups,
    //   shops: Shops,
    //   brands: Brands,
    // });
  };

  sliceData = () => {
    return this.state.data.slice(
      this.state.offset,
      this.state.offset + this.state.perPage
    );
  };

  getPageCount = () => {
    return Math.ceil(this.state.data.length / this.state.perPage);
  };

  setPageSize = (value) => {
    this.setState({ perPage: value });
  };

  sortData = (value) => {
    this.setState({ sort: value }, this.compar);
  };

  compar = () => {
    if (this.state.sort === "Name") {
      this.setState({
        data: this.state.data.sort((a, b) =>
          a.name > b.name ? 1 : b.name > a.name ? -1 : 0
        ),
      });
    }

    if (this.state.sort === "Price") {
      this.setState({
        data: this.state.data.sort((a, b) =>
          a.price > b.price ? -1 : b.price > a.price ? 0 : 1
        ),
      });
    }
  };

  selectedPage = (value) => {
    this.setState({
      offset: (value - 1) * this.state.perPage,
      currentPage: value,
    });
  };

  clearNewColor = () => {
    this.setState({
      newColor: { id: "", color: "", inventory: 0, price: "" },
    });
  };

  selectColor = async () => {
    let error = 0;
    let _fieldColorValidations = {
      divColorSelected: true,
      newInventory: true,
      newPrice: true,
      editInventory: true,
      editPrice: true,
    };

    if (this.state.newColor.inventory == 0) {
      error++;
      _fieldColorValidations.newInventory = false;
    }

    if (this.state.newColor.price == 0) {
      error++;
      _fieldColorValidations.newPrice = false;
    }

    this.setState({ fieldColorValidations: _fieldColorValidations });

    if (error === 0) {
      let element = document.getElementById("colorPicker");
      await this.setState({
        newColor: { ...this.state.newColor, id: v4(), color: element.value },
      });
      await this.setState({
        colors: this.state.colors.concat(this.state.newColor),
      });

      this.setState(
        {
          formData: {
            ...this.state.formData,
            colors: this.state.colors,
            totalInventory:
              parseInt(this.state.formData.totalInventory) +
              parseInt(this.state.newColor.inventory),
          },
        },
        this.clearNewColor
      );
    }
  };

  changeInventoryColor = async () => {
    let error = 0;
    let _fieldColorValidations = {
      divColorSelected: true,
      newInventory: true,
      newPrice: true,
      editInventory: true,
      editPrice: true,
    };

    if (this.state.editColor.inventory == 0) {
      error++;
      _fieldColorValidations.editInventory = false;
    }

    if (this.state.editColor.price == 0) {
      error++;
      _fieldColorValidations.editPrice = false;
    }

    this.setState({ fieldColorValidations: _fieldColorValidations });

    if (error === 0) {
      let _oldInventory = 0;
      await this.setState({
        colors: this.state.colors.map((oldItem) =>
          oldItem.id === this.state.editColor.id
            ? ((_oldInventory = oldItem.inventory), this.state.editColor)
            : oldItem
        ),
      });
      let _totalInventory = this.state.formData.totalInventory;
      _totalInventory = parseInt(_totalInventory) - parseInt(_oldInventory);
      _totalInventory =
        parseInt(_totalInventory) + parseInt(this.state.editColor.inventory);
      await this.setState(
        {
          formData: {
            ...this.state.formData,
            colors: this.state.colors,
            totalInventory: _totalInventory,
          },
          showInventoryModal: 0,
        },
        this.clearEditColor
      );
    }
  };

  unSelectColor = async (colorId) => {
    let _inventory = 0;
    this.state.colors.map((i) =>
      i.id === colorId ? (_inventory = i.inventory) : ""
    );

    await this.setState({
      colors: this.state.colors.filter((i) => i.id !== colorId),
    });

    this.setState({
      formData: {
        ...this.state.formData,
        colors: this.state.colors,
        totalInventory:
          parseInt(this.state.formData.totalInventory) - parseInt(_inventory),
      },
      showInventoryModal: 0,
    });
  };

  selectImage = (event) => {
    let fileLabel = document.getElementById("file-label");
    fileLabel.innerText = event.target.value
      .replace(/\\/g, "/")
      .replace(/.*\//, "");

    this.setState({
      selectFile: event.target.files[0],
    });
  };

  uploadFile = async () => {
    let fileLabel = document.getElementById("file-label");

    const fileData = new FormData();
    fileData.append("FileUpload", this.state.selectFile);
    fileData.append("FileName", this.state.selectFile.name);
    fileData.append("FolderName", this.state.folderName);

    await this.dataSource.UploadFile(
      fileData,
      (res) =>
        this.setState({
          folderName: res,
          listOfImages: this.state.listOfImages.concat(
            this.state.selectFile.name
          ),
        }),
      (fileLabel.innerText = "")
    );

    await this.setState({
      formData: {
        ...this.state.formData,
        folderName: this.state.folderName,
        images: this.state.listOfImages,
      },
    });
  };

  removeUploadFile = async (fileName) => {
    const fileData = new FormData();
    fileData.append("FileUpload", null);
    fileData.append("FileName", fileName);
    fileData.append("FolderName", this.state.folderName);

    await this.dataSource.RemoveUploadFile(fileData, (res) => {
      this.setState({
        listOfImages: this.state.listOfImages.filter(
          (item) => item !== fileName
        ),
      });
    });

    await this.setState({
      formData: {
        ...this.state.formData,
        images: this.state.listOfImages,
      },
    });
  };

  setAttribute = (event) => {
    switch (event.target.name) {
      case "attributeTitle":
        this.setState({
          oneAttribute: {
            id: this.state.attributes.length + 1,
            title: event.target.value,
            value: this.state.oneAttribute.value,
          },
        });
        break;
      case "attributeValue":
        this.setState({
          oneAttribute: {
            id: this.state.attributes.length + 1,
            title: this.state.oneAttribute.title,
            value: event.target.value,
          },
        });
        break;
    }
  };

  addAttribute = async () => {
    let attributeTitle = document.getElementById("attributeTitle");
    let attributeValue = document.getElementById("attributeValue");
    attributeTitle.value = "";
    attributeValue.value = "";

    await this.setState({
      attributes: this.state.attributes.concat(this.state.oneAttribute),
    });

    this.setState({
      formData: {
        ...this.state.formData,
        attributes: this.state.attributes,
      },
    });
  };

  removeItemOfList = async (item) => {
    await this.setState({
      attributes: this.state.attributes.filter((value) => value.id !== item.id),
    });

    const _attributes = this.state.attributes;

    await _attributes.map((value, index) => (value.id = index + 1));

    await this.setState({ attributes: _attributes });

    this.setState({
      formData: {
        ...this.state.formData,
        attributes: this.state.attributes,
      },
    });
  };

  setValues = async (event) => {
    switch (event.target.name) {
      case "name":
        this.setState({
          formData: {
            ...this.state.formData,
            name: event.target.value,
          },
        });
        break;
      case "active":
        this.setState({
          formData: {
            ...this.state.formData,
            active: event.target.value,
          },
        });
        break;
      case "descriptions":
        this.setState({
          formData: {
            ...this.state.formData,
            descriptions: event.target.value,
          },
        });
        break;
      case "model":
        this.setState({
          formData: {
            ...this.state.formData,
            model: event.target.value,
          },
        });
        break;
      case "price":
        this.setState({
          newColor: {
            ...this.state.newColor,
            price: event.target.value,
          },
        });
        break;
      case "brand":
        this.setState({
          formData: {
            ...this.state.formData,
            brandId: event.target.value,
          },
        });
        break;
      case "shop":
        this.setState({
          formData: {
            ...this.state.formData,
            shopId: event.target.value,
          },
        });
        break;
      case "inventory":
        this.setState({
          newColor: {
            ...this.state.newColor,
            inventory: event.target.value,
          },
        });
        break;
      case "group":
        this.setState({
          formData: {
            ...this.state.formData,
            groupId: event.target.value,
          },
        });
        break;
      case "hasSize":
        let _value = event.target.value;
        await this.setState({
          formData: {
            ...this.state.formData,
            hasSize: _value,
          },
        });

        if (_value == 1) {
          this.setState({
            elementsSettings: {
              ...this.state.elementsSettings,
              slcSizeType: false,
            },
          });
        } else {
          this.setState({
            formData: {
              ...this.state.formData,
              sizeType: 0,
            },
            fieldSizeValidations: {
              sizeType: true,
              title: true,
              divColorSize: true,
              inventory: true,
              price: true,
              btnAddSize: true,
              editInventory: true,
              editPrice: true,
            },
            newSize: {
              id: "",
              title: "",
              colorId: "",
              inventory: 0,
              price: "",
            },
            elementsSettings: {
              ...this.state.elementsSettings,
              slcSizeType: true,
              txtSizesTitle: true,
              lblColorForSize: true,
              txtSizesInventory: true,
              txtSizePrice: true,
              btnAddSize: true,
            },
          });

          this.state.colors.map(
            (value) =>
              (document.getElementById(`cs${value.id}`).style.border = "none")
          );
        }
        break;
      case "sizeType":
        this.setState({
          formData: {
            ...this.state.formData,
            sizeType: event.target.value,
          },
        });

        if (event.target.value != 0) {
          this.setState({
            elementsSettings: {
              ...this.state.elementsSettings,
              txtSizesTitle: false,
              lblColorForSize: false,
              txtSizesInventory: false,
              txtSizePrice: false,
              btnAddSize: false,
            },
          });
        } else {
          this.setState({
            newSize: {
              id: "",
              title: "",
              colorId: "",
              inventory: 0,
              price: "",
            },
            elementsSettings: {
              ...this.state.elementsSettings,
              txtSizesTitle: true,
              lblColorForSize: true,
              txtSizesInventory: true,
              txtSizePrice: true,
              btnAddSize: true,
            },
          });

          this.state.colors.map(
            (value) =>
              (document.getElementById(`cs${value.id}`).style.border = "none")
          );
        }
        break;
    }
  };

  checkValidation = async () => {
    let error = 0;
    let _fieldValidations = {
      name: true,
      shopId: true,
      brandId: true,
      groupId: true,
    };
    let _divColorSelected = true;

    Object.keys(this.state.fieldValidations).forEach((field) => {
      if (
        this.state.formData[field] === "" ||
        this.state.formData[field] == 0
      ) {
        error++;
        _fieldValidations[field] = false;
      }
    });

    if (this.state.formData.colors.length == 0) {
      error++;
      _divColorSelected = false;
    } else {
      if (this.state.formData.hasSize == 0) {
        let _minPrice = this.state.formData.colors[0].price;

        await this.state.formData.colors.map((i) =>
          i.price < _minPrice ? (_minPrice = i.price) : ""
        );

        this.setState({
          formData: { ...this.state.formData, price: _minPrice },
        });
      }
    }

    if (this.state.formData.hasSize == 1) {
      if (this.state.formData.sizeType == 0) {
        this.setState({
          fieldSizeValidations: {
            ...this.state.fieldSizeValidations,
            sizeType: false,
          },
        });
        error++;
      } else {
        let _fieldSizeValidations = {
          title: true,
          divColorSize: true,
          inventory: true,
          price: true,
          btnAddSize: true,
        };

        if (this.state.sizes.length == 0) {
          error++;

          if (this.state.newSize.title === "") {
            error++;
            _fieldSizeValidations.title = false;
          }

          if (this.state.newSize.colorId === "") {
            error++;
            _fieldSizeValidations.divColorSize = false;
          }

          if (this.state.newSize.inventory == 0) {
            error++;
            _fieldSizeValidations.inventory = false;
          }

          if (this.state.newSize.price == 0) {
            error++;
            _fieldSizeValidations.price = false;
          }

          _fieldSizeValidations.btnAddSize = false;
        } else {
          let _minPrice = this.state.formData.sizes[0].price;

          await this.state.formData.sizes.map((i) =>
            i.price < _minPrice ? (_minPrice = i.price) : ""
          );

          this.setState({
            formData: { ...this.state.formData, price: _minPrice },
          });
        }

        this.setState({
          fieldSizeValidations: {
            ...this.state.fieldSizeValidations,
            sizeType: true,
            title: _fieldSizeValidations.title,
            divColorSize: _fieldSizeValidations.divColorSize,
            inventory: _fieldSizeValidations.inventory,
            price: _fieldSizeValidations.price,
            btnAddSize: _fieldSizeValidations.btnAddSize,
          },
        });
      }
    }

    this.setState({
      fieldValidations: _fieldValidations,
      fieldColorValidations: {
        ...this.state.fieldColorValidations,
        divColorSelected: _divColorSelected,
      },
    });
    if (error === 0) this.save();
  };

  save = async () => {
    if (this.state.formData.id === 0) {
      await this.dataSource.Insert(this.state.formData, (res) =>
        this.setState({ showMainPage: 1, showSavePage: 0, result: res })
      );
      this.clear();
    } else {
      await this.dataSource.Update(this.state.formData, (res) =>
        this.setState({ showMainPage: 1, showSavePage: 0, result: res })
      );
      this.clear();
    }
    window.location.reload();
  };

  clear = () => {
    this.setState({
      formData: {
        id: 0,
        name: "",
        deleted: 0,
        active: 1,
        descriptions: "",
        folderName: "",
        images: [],
        attributes: [],
        colors: [],
        model: "",
        price: "0",
        brandId: 0,
        brandName: "",
        shopId: 0,
        shopName: "",
        totalInventory: 0,
        groupId: 0,
        groupName: "",
        hasSize: 0,
        sizeType: 0,
        sizes: [],
      },
      searchData: {
        name: "",
        model: "",
        active: -1,
        brandId: -1,
        shopId: -1,
        groupId: -1,
      },
      colors: [],
      newColor: { id: "", color: "", inventory: 0, price: "" },
      sizes: [],
      newSize: { id: "", title: "", colorId: "", inventory: 0, price: "" },
      selectFile: null,
      folderName: "",
      image: { name: "" },
      listOfImages: [],
      oneAttribute: { id: 0, title: "", value: "", deleted: 0 },
      attributes: [],
      fieldValidations: {
        name: true,
        shopId: true,
        brandId: true,
        groupId: true,
      },
      fieldSizeValidations: {
        sizeType: true,
        title: true,
        divColorSize: true,
        inventory: true,
        price: true,
        btnAddSize: true,
        editInventory: true,
        editPrice: true,
      },
      fieldColorValidations: {
        divColorSelected: true,
        newInventory: true,
        newPrice: true,
        editInventory: true,
        editPrice: true,
      },
      cardTitle: "New a product",
      elementsSettings: {
        slcHasSize: false,
        slcSizeType: true,
        txtSizesTitle: true,
        lblColorForSize: true,
        txtSizesInventory: true,
        txtSizePrice: true,
        btnAddSize: true,
        detailsColorModal: false,
        detailsSizeModal: false,
      },
    });
  };

  cancel = () => {
    this.clear();
    this.setState({ showMainPage: 1, showSavePage: 0, showDetailPage: 0 });
  };

  deleteData = async () => {
    await this.dataSource.Delete(this.state.deleteData.id, (res) =>
      this.setState({ showDeleteModal: 0, result: res })
    );
    window.location.reload();
  };

  editData = (item) => {
    this.setState(
      {
        attributes: item.attributes,
        listOfImages: item.images,
        colors: item.colors,
        sizes: item.sizes,
        folderName: item.folderName,
        formData: {
          id: item.id,
          name: item.name,
          active: item.active,
          descriptions: item.descriptions,
          folderName: item.folderName,
          images: item.images,
          attributes: item.attributes,
          colors: item.colors,
          model: item.model,
          price: item.price,
          brandId: item.brandId,
          brandName: item.brandName,
          shopId: item.shopId,
          shopName: item.shopName,
          totalInventory: item.totalInventory,
          groupId: item.groupId,
          groupName: item.groupName,
          hasSize: item.hasSize,
          sizeType: item.sizeType,
          sizes: item.sizes,
        },
        showMainPage: 0,
        showSavePage: 1,
      },
      this.filterData
    );

    if (item.hasSize == 1) {
      this.setState({
        elementsSettings: {
          ...this.state.elementsSettings,
          slcHasSize: true,
          slcSizeType: true,
          txtSizesTitle: false,
          lblColorForSize: false,
          txtSizesInventory: false,
          txtSizePrice: false,
          btnAddSize: false,
        },
      });
    }
  };

  detailData = async (item) => {
    await this.editData(item);
    this.setState({ cardTitle: "Detail product", showDetailPage: 1 });

    let form = document.getElementById("inputForm");
    let elements = form.elements;
    for (let i = 0, len = elements.length; i < len; ++i) {
      elements[i].disabled = true;
    }

    document.getElementById("divInputAttribute").style.display = "none";
    this.state.attributes.map(
      (item) =>
        (document.getElementById(`tdAttribute${item.id}`).style.display =
          "none")
    );
    document.getElementById("thAttribute").style.display = "none";

    document.getElementById("divAddImage").style.display = "none";
    this.state.listOfImages.map(
      (item, index) =>
        (document.getElementById(`btnRemove${index}`).style.display = "none")
    );

    document.getElementById("divColors").style.display = "none";

    this.setState({
      elementsSettings: {
        ...this.state.elementsSettings,
        detailsColorModal: true,
      },
    });

    document.getElementById("divSizeType").style.display = "none";
    document.getElementById("divSizeDetail").style.display = "none";
    document.getElementById("slcHasSize").disabled = true;

    if (!item.hasSize) {
      document.getElementById("divSizesCreated").style.display = "none";
    }

    if (item.sizeType == ProductSizeTypeEnum.Lots_of_choice) {
      document.getElementById("btnEditSize").style.display = "none";
    }

    document.getElementById("btnSave").style.display = "none";
    document.getElementById("btnCancel").innerHTML = "Back";
  };

  search = async () => {
    await this.dataSource.Search(this.state.searchData, (res) =>
      this.setState({ data: res, offset: 0, currentPage: 1 })
    );
  };

  setSearchValues = (event) => {
    switch (event.target.name) {
      case "name":
        this.setState({
          searchData: {
            ...this.state.searchData,
            name: event.target.value,
          },
        });
        break;
      case "model":
        this.setState({
          searchData: {
            ...this.state.searchData,
            model: event.target.value,
          },
        });
        break;
      case "status":
        this.setState({
          searchData: {
            ...this.state.searchData,
            active: event.target.value,
          },
        });
        break;
      case "brand":
        this.setState({
          searchData: {
            ...this.state.searchData,
            brandId: event.target.value,
          },
        });
        break;
      case "shop":
        this.setState({
          searchData: {
            ...this.state.searchData,
            shopId: event.target.value,
          },
        });
        break;
      case "group":
        this.setState({
          searchData: {
            ...this.state.searchData,
            groupId: event.target.value,
          },
        });
        break;
    }
  };

  filterData = async () => {
    this.setState({
      activeShops: this.state.shops.filter((i) => i.active == true),
      activeBrands: this.state.brands.filter((i) => i.active == true),
      activeGroups: this.state.groups.filter((i) => i.active == true),
    });
  };

  setEditColor = (event) => {
    switch (event.target.name) {
      case "inventory":
        this.setState({
          editColor: { ...this.state.editColor, inventory: event.target.value },
        });
        break;
      case "price":
        this.setState({
          editColor: { ...this.state.editColor, price: event.target.value },
        });
        break;
    }
  };

  clearEditColor = () => {
    this.setState({
      editColor: { id: "", color: "", inventory: 0, price: "" },
      fieldColorValidations: {
        ...this.state.fieldColorValidations,
        editInventory: true,
        editPrice: true,
      },
      showInventoryModal: 0,
    });
  };

  setSizeValue = (event) => {
    switch (event.target.name) {
      case "sizesTitle":
        this.setState({
          newSize: {
            ...this.state.newSize,
            title: event.target.value,
          },
        });
        break;
      case "sizesInventory":
        this.setState({
          newSize: {
            ...this.state.newSize,
            inventory: event.target.value,
          },
        });
        break;
      case "sizePrice":
        this.setState({
          newSize: {
            ...this.state.newSize,
            price: event.target.value,
          },
        });
        break;
    }
  };

  addNewSize = async () => {
    let error = 0;
    let _fieldSizeValidations = {
      title: true,
      divColorSize: true,
      inventory: true,
      price: true,
    };

    if (this.state.newSize.title === "") {
      error++;
      _fieldSizeValidations.title = false;
    }

    if (this.state.newSize.colorId === "") {
      error++;
      _fieldSizeValidations.divColorSize = false;
    }

    if (this.state.newSize.inventory == 0) {
      error++;
      _fieldSizeValidations.inventory = false;
    }

    if (this.state.newSize.price == 0) {
      error++;
      _fieldSizeValidations.price = false;
    }

    this.setState({
      fieldSizeValidations: {
        ...this.state.fieldSizeValidations,
        title: _fieldSizeValidations.title,
        divColorSize: _fieldSizeValidations.divColorSize,
        inventory: _fieldSizeValidations.inventory,
        price: _fieldSizeValidations.price,
        btnAddSize: true,
      },
    });

    if (error === 0) {
      this.setState({
        elementsSettings: {
          ...this.state.elementsSettings,
          slcHasSize: true,
          slcSizeType: true,
        },
      });

      await this.setState({ newSize: { ...this.state.newSize, id: v4() } });
      this.setState({ sizes: this.state.sizes.concat(this.state.newSize) });
      this.setState(
        {
          formData: { ...this.state.formData, sizes: this.state.sizes },
        },
        this.clearNewSize
      );

      this.state.colors.map(
        (value) =>
          (document.getElementById(`cs${value.id}`).style.border = "none")
      );
    }
  };

  clearNewSize = () => {
    this.setState({
      newSize: { id: "", title: "", colorId: "", inventory: 0, price: "" },
    });
  };

  selectSize = (event) => {
    this.state.sizes.map((i) =>
      i.id == event.target.value ? this.setState({ editSize: i }) : ""
    );
  };

  clearEditSize = () => {
    this.setState({
      editSize: { id: "", title: "", colorId: "", inventory: 0, price: "" },
      fieldSizeValidations: {
        ...this.state.fieldSizeValidations,
        editInventory: true,
        editPrice: true,
      },
    });

    if (this.state.formData.sizeType == ProductSizeTypeEnum.Lots_of_choice) {
      document.getElementById("slcSizeSelected").value = "";
    }
  };

  editSize = (event) => {
    switch (event.target.name) {
      case "inventory":
        this.setState({
          editSize: { ...this.state.editSize, inventory: event.target.value },
        });
        break;
      case "price":
        this.setState({
          editSize: { ...this.state.editSize, price: event.target.value },
        });
        break;
    }
  };

  changeSizeInventory = async () => {
    let error = 0;
    let _fieldSizeValidations = {
      editInventory: true,
      editPrice: true,
    };

    if (this.state.editSize.inventory == 0) {
      error++;
      _fieldSizeValidations.editInventory = false;
    }

    if (this.state.editSize.price == 0) {
      error++;
      _fieldSizeValidations.editPrice = false;
    }

    this.setState({
      fieldSizeValidations: {
        ...this.state.fieldSizeValidations,
        editInventory: _fieldSizeValidations.editInventory,
        editPrice: _fieldSizeValidations.editPrice,
      },
    });

    if (error === 0) {
      await this.setState({
        sizes: this.state.sizes.map((i) =>
          i.id == this.state.editSize.id ? this.state.editSize : i
        ),
      });

      this.setState(
        {
          formData: { ...this.state.formData, sizes: this.state.sizes },
          showSizeInventoryModal: 0,
        },
        this.clearEditSize
      );
    }
  };

  deleteSelectedSize = async () => {
    if (this.state.sizes.length == 1) {
      await this.setState({
        sizes: [],
        elementsSettings: {
          ...this.state.elementsSettings,
          slcHasSize: false,
          slcSizeType: false,
        },
      });
    } else {
      await this.setState({
        sizes: this.state.sizes.filter((i) => i.id !== this.state.editSize.id),
      });
    }

    await this.setState(
      {
        formData: { ...this.state.formData, sizes: this.state.sizes },
        showSizeInventoryModal: 0,
      },
      this.clearEditSize
    );
  };

  selectColorforSize = (_colorId) => {
    this.state.colors.map(
      (value) =>
        (document.getElementById(`cs${value.id}`).style.border = "none")
    );

    document.getElementById(`cs${_colorId}`).style.border = "3px solid green";
    this.setState({
      newSize: {
        ...this.state.newSize,
        colorId: _colorId,
      },
    });
  };

  editSizeInventory = async (item) => {
    await this.setState({ editSize: item, showSizeInventoryModal: 1 });

    if (this.state.showDetailPage == 1) {
      await this.setState({
        elementsSettings: {
          ...this.state.elementsSettings,
          detailsSizeModal: true,
        },
      });
    }
  };

  render() {
    if (this.state.showMainPage) {
      return (
        <div className="bodyApp">
          <div className="container-fluid p-4">
            <form className="d-flex">
              <div className="form-group m-2">
                <label>Name:</label>
                <input
                  className="form-control"
                  name="name"
                  onChange={this.setSearchValues}
                  type="text"
                  placeholder="Enter Name"
                  aria-label="Name"
                />
              </div>
              <div className="form-group m-2">
                <label>Model:</label>
                <input
                  className="form-control"
                  name="model"
                  onChange={this.setSearchValues}
                  type="text"
                  placeholder="Enter Model"
                  aria-label="Model"
                />
              </div>
              <div className="form-group m-2">
                <label>Status:</label>
                <select
                  name="status"
                  className="form-control"
                  onChange={this.setSearchValues}
                  aria-label="Status"
                >
                  <option value="-1">All</option>
                  <option value="1">Active</option>
                  <option value="0">Inactive</option>
                </select>
              </div>
              <div className="form-group m-2">
                <label>Brand:</label>
                <select
                  name="brand"
                  className="form-control"
                  onChange={this.setSearchValues}
                  aria-label="Brand"
                >
                  <option value="-1"></option>
                  {this.state.brands.map((i) => (
                    <option value={i.id}>{i.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-group m-2">
                <label>Shop:</label>
                <select
                  name="shop"
                  className="form-control"
                  onChange={this.setSearchValues}
                  aria-label="Shop"
                >
                  <option value="-1"></option>
                  {this.state.shops.map((i) => (
                    <option value={i.id}>{i.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-group m-2">
                <label>Group:</label>
                <select
                  name="group"
                  className="form-control"
                  onChange={this.setSearchValues}
                  aria-label="Group"
                >
                  <option value="-1"></option>
                  {this.state.groups.map((i) => (
                    <option value={i.id}>{i.name}</option>
                  ))}
                </select>
              </div>
            </form>
            <div className="form-group m-2">
              <button
                className="btn btn-outline-primary"
                aria-label="Search"
                onClick={this.search}
              >
                Search
              </button>
            </div>
            <hr />
          </div>
          <div>
            <div className="product-div">
              <div className="row justify-content-center row-cols-xs row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-4">
                {this.sliceData().map((item) => (
                  <div className="col-auto d-flex mb-4">
                    <div className="card public-card">
                      <img
                        className="card-img-top col-height"
                        src={`Images\\Products\\${item.folderName}\\${item.images[0]}`}
                        alt="Card image cap"
                      />
                      <div class="card-body">
                        <h5 class="card-title">{item.name}</h5>
                        <p class="card-text">
                          {item.name} {item.model}
                        </p>
                        <div className="form-group">
                          <button
                            className="btn btn-sm btn-secondary m-1"
                            onClick={() => this.detailData(item)}
                          >
                            Detail
                          </button>
                          <button
                            className="btn btn-sm btn-warning m-1"
                            onClick={() =>
                              this.setState(
                                { cardTitle: "Edit product" },
                                this.editData(item)
                              )
                            }
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-sm btn-danger m-1"
                            onClick={() =>
                              this.setState({
                                showDeleteModal: 1,
                                deleteData: { id: item.id, name: item.name },
                              })
                            }
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <PaginationControls
                keys={["Name", "Price"]}
                currentPage={this.state.currentPage}
                pageCount={this.getPageCount()}
                pageSizes={this.state.pageSizes}
                sortCallBack={this.sortData}
                pageSizeCallBack={this.setPageSize}
                selectedPageCallBack={this.selectedPage}
              />
              <div className="container-fluid">
                <button
                  className="btn btn-primary"
                  aria-label="Add"
                  onClick={() =>
                    this.setState(
                      { showSavePage: 1, showMainPage: 0 },
                      () => this.clear(),
                      this.filterData()
                    )
                  }
                >
                  Add
                </button>
              </div>
            </div>
            <Modal show={this.state.showDeleteModal}>
              <Modal.Header>
                <h5>Delete {this.state.deleteData.name}</h5>
                <button
                  type="button"
                  className="btn btn-danger close"
                  onClick={() => this.setState({ showDeleteModal: 0 })}
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </Modal.Header>
              <ModalBody>Are You Sure?</ModalBody>
              <Modal.Footer>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => this.setState({ showDeleteModal: 0 })}
                >
                  No
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={this.deleteData}
                >
                  Yes
                </button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      );
    } else if (this.state.showSavePage) {
      return (
        <section className="page-input d-flex justify-content-center">
          <div className="card card-input">
            <div className="card-header cardH">
              <h1 className="card-title">{this.state.cardTitle}</h1>
            </div>
            <div className="card-body">
              <div>
                <form id="inputForm">
                  <div className="d-flex row row-cols-2">
                    <div className="position-relative form-group col">
                      <label>Name:</label>
                      <input
                        className="form-control"
                        name="name"
                        type="text"
                        value={this.state.formData.name}
                        onChange={this.setValues}
                        placeholder="Enter Name"
                        aria-label="Name"
                        style={
                          this.state.fieldValidations.name
                            ? { borderColor: "#ced4da" }
                            : { borderColor: "#dc3545" }
                        }
                      />
                      <div
                        className="invalid-tooltip"
                        style={{
                          display: this.state.fieldValidations.name
                            ? "none"
                            : "inline",
                        }}
                      >
                        Please fill out this field.
                      </div>
                    </div>
                    <div className="form-group col">
                      <label>Model:</label>
                      <input
                        className="form-control"
                        name="model"
                        type="text"
                        value={this.state.formData.model}
                        onChange={this.setValues}
                        placeholder="Enter Model"
                        aria-label="Model"
                      />
                    </div>
                    <div className="position-relative form-group col">
                      <label>Shop:</label>
                      <select
                        className="form-control"
                        name="shop"
                        value={this.state.formData.shopId}
                        onChange={this.setValues}
                        aria-label="Shop"
                        style={
                          this.state.fieldValidations.shopId
                            ? { borderColor: "#ced4da" }
                            : { borderColor: "#dc3545" }
                        }
                      >
                        <option value=""></option>
                        {this.state.activeShops.map((i) => (
                          <option value={i.id}>{i.name}</option>
                        ))}
                      </select>
                      <div
                        className="invalid-tooltip"
                        style={{
                          display: this.state.fieldValidations.shopId
                            ? "none"
                            : "inline",
                        }}
                      >
                        Please select a shop.
                      </div>
                    </div>
                    <div className="position-relative form-group col">
                      <label>Brand:</label>
                      <select
                        className="form-control"
                        name="brand"
                        value={this.state.formData.brandId}
                        onChange={this.setValues}
                        aria-label="Brand"
                        style={
                          this.state.fieldValidations.brandId
                            ? { borderColor: "#ced4da" }
                            : { borderColor: "#dc3545" }
                        }
                      >
                        <option value=""></option>
                        {this.state.activeBrands.map((i) => (
                          <option value={i.id}>{i.name}</option>
                        ))}
                      </select>
                      <div
                        className="invalid-tooltip"
                        style={{
                          display: this.state.fieldValidations.brandId
                            ? "none"
                            : "inline",
                        }}
                      >
                        Please select a brand.
                      </div>
                    </div>
                    <div className="position-relative form-group col">
                      <label>Group:</label>
                      <select
                        className="form-control"
                        name="group"
                        value={this.state.formData.groupId}
                        onChange={this.setValues}
                        aria-label="Group"
                        style={
                          this.state.fieldValidations.groupId
                            ? { borderColor: "#ced4da" }
                            : { borderColor: "#dc3545" }
                        }
                      >
                        <option value=""></option>
                        {this.state.activeGroups.map((i) => (
                          <option value={i.id}>{i.name}</option>
                        ))}
                      </select>
                      <div
                        className="invalid-tooltip"
                        style={{
                          display: this.state.fieldValidations.groupId
                            ? "none"
                            : "inline",
                        }}
                      >
                        Please select a valid group.
                      </div>
                    </div>
                  </div>

                  <div className="d-flex row position-relative form-group col">
                    <label>Descriptions:</label>
                    <textarea
                      className="form-control"
                      name="descriptions"
                      type="text"
                      value={this.state.formData.descriptions}
                      onChange={this.setValues}
                      placeholder="Enter Descriptions"
                      aria-label="Descriptions"
                      rows="10"
                    />
                  </div>

                  <div className="d-flex row row-cols-xs row-cols-sm-2 row-cols-md-2 row-cols-lg-2 row-cols-xl-2">
                    <div
                      className="position-relative form-group col-auto"
                      id="divInputAttribute"
                    >
                      <div className="custom">
                        <label>Attribute Title:</label>
                        <input
                          className="form-control"
                          name="attributeTitle"
                          id="attributeTitle"
                          type="text"
                          onChange={this.setAttribute}
                          placeholder="Enter Title"
                          aria-label="AttributeTitle"
                        />
                        <label>Attribute Value:</label>
                        <input
                          className="form-control"
                          name="attributeValue"
                          id="attributeValue"
                          type="text"
                          onChange={this.setAttribute}
                          placeholder="Enter Value"
                          aria-label="AttributeValue"
                        />
                        <a
                          className="btn btn-primary m-1"
                          type="button"
                          name="addValue"
                          id="addAttribute"
                          onClick={this.addAttribute}
                        >
                          Add Attribute
                        </a>
                      </div>
                    </div>
                    <div className="form-group col-auto">
                      <label>Attributes:</label>
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Title</th>
                            <th>Value</th>
                            <th id="thAttribute"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.attributes.map((item) => (
                            <tr key={item.id}>
                              <td className="text-secondary">{item.title}</td>
                              <td>{item.value}</td>
                              <td id={`tdAttribute${item.id}`}>
                                <a
                                  className="btn-listItem"
                                  onClick={() => this.removeItemOfList(item)}
                                >
                                  x
                                </a>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="d-flex row row-cols-xs row-cols-sm-2 row-cols-md-2 row-cols-lg-2 row-cols-xl-2">
                    <div
                      className="position-relative form-group col-auto"
                      id="divAddImage"
                    >
                      <label>Add Image:</label>
                      <div className="custom-file">
                        <input
                          class="custom-file-input"
                          type="file"
                          id="formFileMultiple"
                          accept=".jpg"
                          onChange={this.selectImage}
                        />
                        <label
                          className="custom-file-label"
                          id="file-label"
                          for="formFileMultiple"
                        >
                          Choose file
                        </label>
                      </div>
                      <a
                        className="btn btn-primary m-1"
                        name="upload"
                        onClick={this.uploadFile}
                      >
                        Upload
                      </a>
                    </div>

                    <div className="form-group col-auto">
                      <label>Images Uploaded:</label>
                      <div className="row row-cols-xs-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-4 text-center text-lg-start">
                        {this.state.listOfImages.map((image, index) => (
                          <div className="col-auto">
                            <figure className="figure">
                              <button
                                type="button"
                                className="btn btn-danger close"
                                id={`btnRemove${index}`}
                                onClick={() => this.removeUploadFile(image)}
                                aria-label="Close"
                              >
                                <span aria-hidden="true">&times;</span>
                              </button>
                              <img
                                className="figure-img img-fluid img-thumbnail rounded"
                                key={index}
                                alt="art"
                                src={`Images\\Products\\${this.state.folderName}\\${image}`}
                              />
                            </figure>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="d-flex row row-cols-2">
                    <div className="form-group col" id="divColors">
                      <div>
                        <label>Colors:</label>
                        <div className="input-group">
                          <input
                            className="form-control m-1"
                            name="colors"
                            id="colorPicker"
                            type="color"
                            aria-label="Colors"
                          />
                          <a
                            className="btn btn-primary m-1"
                            name="colorSelect"
                            onClick={this.selectColor}
                          >
                            Select
                          </a>
                        </div>
                      </div>
                      <div className="position-relative">
                        <label>Inventory:</label>
                        <input
                          className="form-control"
                          name="inventory"
                          type="number"
                          value={this.state.newColor.inventory}
                          onChange={this.setValues}
                          placeholder="Enter Inventory"
                          aria-label="Inventory"
                          style={
                            this.state.fieldColorValidations.newInventory
                              ? { borderColor: "#ced4da" }
                              : { borderColor: "#dc3545" }
                          }
                        />
                        <div
                          className="invalid-tooltip"
                          style={{
                            display: this.state.fieldColorValidations
                              .newInventory
                              ? "none"
                              : "inline",
                          }}
                        >
                          Please fill out this field.
                        </div>
                      </div>
                      <div className="position-relative">
                        <label>Price:</label>
                        <div className="input-group">
                          <input
                            name="price"
                            type="number"
                            className="form-control"
                            value={this.state.newColor.price}
                            onChange={this.setValues}
                            aria-label="Amount (to the nearest dollar)"
                            placeholder="Enter Price"
                            style={
                              this.state.fieldColorValidations.newPrice
                                ? { borderColor: "#ced4da" }
                                : { borderColor: "#dc3545" }
                            }
                          />
                          <div className="input-group-append">
                            <span className="input-group-text">$</span>
                            <span className="input-group-text">0.00</span>
                          </div>
                          <div
                            className="invalid-tooltip"
                            style={{
                              display: this.state.fieldColorValidations.newPrice
                                ? "none"
                                : "inline",
                            }}
                          >
                            Please fill out this field.
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="form-group col">
                      <div
                        className={
                          this.state.fieldColorValidations.divColorSelected
                            ? "position-relative"
                            : "border border-danger position-relative"
                        }
                      >
                        <label>Colors Selected:</label>
                        <div>
                          {this.state.colors.map((value, index) => (
                            <label
                              className="label-circle-notification"
                              id={value.id}
                              key={index}
                              style={{ backgroundColor: `${value.color}` }}
                              onClick={() =>
                                this.setState({
                                  editColor: value,
                                  showInventoryModal: 1,
                                })
                              }
                            >
                              <span className="badge">{value.inventory}</span>
                            </label>
                          ))}
                        </div>
                        <div
                          className="invalid-tooltip"
                          style={{
                            display: this.state.fieldColorValidations
                              .divColorSelected
                              ? "none"
                              : "inline",
                          }}
                        >
                          Please add a color.
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex row row-cols-2">
                    <div className="form-group col">
                      <label>Active:</label>
                      <select
                        className="form-control"
                        name="active"
                        type="number"
                        value={this.state.formData.active}
                        onChange={this.setValues}
                        aria-label="Active"
                      >
                        <option value="1">Active</option>
                        <option value="0">Inactive</option>
                      </select>
                    </div>
                  </div>
                </form>
                {/* ******************************************************************************** */}
                <div className="d-flex row row-cols-2">
                  <div className="form-group col">
                    <label>Has Size:</label>
                    <select
                      className="form-control"
                      name="hasSize"
                      id="slcHasSize"
                      type="number"
                      value={this.state.formData.hasSize}
                      onChange={this.setValues}
                      aria-label="Has Size"
                      disabled={this.state.elementsSettings.slcHasSize}
                    >
                      <option value="0">No</option>
                      <option value="1">Yes</option>
                    </select>
                  </div>
                  <div
                    className="form-group col position-relative"
                    id="divSizeType"
                  >
                    <label>Select Size Type:</label>
                    <select
                      className="form-control"
                      name="sizeType"
                      type="number"
                      value={this.state.formData.sizeType}
                      onChange={this.setValues}
                      aria-label="Select Size Type"
                      disabled={this.state.elementsSettings.slcSizeType}
                      style={
                        this.state.fieldSizeValidations.sizeType
                          ? { borderColor: "#ced4da" }
                          : { borderColor: "#dc3545" }
                      }
                    >
                      <option value="0"></option>
                      <option value={ProductSizeTypeEnum.little_choice}>
                        little choice
                      </option>
                      <option value={ProductSizeTypeEnum.Lots_of_choice}>
                        Lots of choice
                      </option>
                    </select>
                    <div
                      className="invalid-tooltip"
                      style={{
                        display: this.state.fieldSizeValidations.sizeType
                          ? "none"
                          : "inline",
                      }}
                    >
                      Please select a item.
                    </div>
                  </div>
                  <div className="form-group col" id="divSizeDetail">
                    <div className="position-relative">
                      <label>Sizes Title:</label>
                      <input
                        className="form-control"
                        name="sizesTitle"
                        type="text"
                        value={this.state.newSize.title}
                        onChange={this.setSizeValue}
                        placeholder="Enter Sizes Title"
                        aria-label="Sizes Title"
                        disabled={this.state.elementsSettings.txtSizesTitle}
                        style={
                          this.state.fieldSizeValidations.title
                            ? { borderColor: "#ced4da" }
                            : { borderColor: "#dc3545" }
                        }
                      />
                      <div
                        className="invalid-tooltip"
                        style={{
                          display: this.state.fieldSizeValidations.title
                            ? "none"
                            : "inline",
                        }}
                      >
                        Please fill out this field.
                      </div>
                    </div>

                    <div className="position-relative mt-2">
                      <label>Color for Size:</label>
                      <div
                        className={
                          this.state.fieldSizeValidations.divColorSize
                            ? ""
                            : "border border-danger"
                        }
                      >
                        {this.state.colors.map((value, index) => (
                          <label
                            className="label-circle"
                            id={`cs${value.id}`}
                            key={index}
                            style={{
                              backgroundColor: `${value.color}`,
                              pointerEvents: this.state.elementsSettings
                                .lblColorForSize
                                ? "none"
                                : "",
                            }}
                            onClick={() => this.selectColorforSize(value.id)}
                          />
                        ))}
                      </div>
                      <div
                        className="invalid-tooltip"
                        style={{
                          display: this.state.fieldSizeValidations.divColorSize
                            ? "none"
                            : "inline",
                        }}
                      >
                        Please select a color.
                      </div>
                    </div>

                    <div className="position-relative">
                      <label>Sizes Inventory:</label>
                      <input
                        className="form-control"
                        name="sizesInventory"
                        type="number"
                        value={this.state.newSize.inventory}
                        onChange={this.setSizeValue}
                        placeholder="Enter Sizes Inventory"
                        aria-label="Sizes Inventory"
                        disabled={this.state.elementsSettings.txtSizesInventory}
                        style={
                          this.state.fieldSizeValidations.inventory
                            ? { borderColor: "#ced4da" }
                            : { borderColor: "#dc3545" }
                        }
                      />
                      <div
                        className="invalid-tooltip"
                        style={{
                          display: this.state.fieldSizeValidations.inventory
                            ? "none"
                            : "inline",
                        }}
                      >
                        Please fill out this field.
                      </div>
                    </div>
                    <div className="position-relative">
                      <label>Price:</label>
                      <div className="input-group">
                        <input
                          name="sizePrice"
                          type="number"
                          className="form-control"
                          value={this.state.newSize.price}
                          onChange={this.setSizeValue}
                          aria-label="Amount (to the nearest dollar)"
                          placeholder="Enter Size Price"
                          disabled={this.state.elementsSettings.txtSizePrice}
                          style={
                            this.state.fieldSizeValidations.price
                              ? { borderColor: "#ced4da" }
                              : { borderColor: "#dc3545" }
                          }
                        />
                        <div className="input-group-append">
                          <span className="input-group-text">$</span>
                          <span className="input-group-text">0.00</span>
                        </div>
                        <div
                          className="invalid-tooltip"
                          style={{
                            display: this.state.fieldSizeValidations.price
                              ? "none"
                              : "inline",
                          }}
                        >
                          Please fill out this field.
                        </div>
                      </div>
                    </div>
                    <div className="position-relative">
                      <button
                        className="btn btn-primary m-1"
                        name="addSize"
                        aria-label="Add size"
                        onClick={this.addNewSize}
                        disabled={this.state.elementsSettings.btnAddSize}
                        style={
                          this.state.fieldSizeValidations.btnAddSize
                            ? { borderColor: "#ced4da" }
                            : { borderColor: "#dc3545" }
                        }
                      >
                        Add size
                      </button>
                      <div
                        className="invalid-tooltip"
                        style={{
                          display: this.state.fieldSizeValidations.btnAddSize
                            ? "none"
                            : "inline",
                        }}
                      >
                        Please click on the add size.
                      </div>
                    </div>
                  </div>
                  <div className="form-group col" id="divSizesCreated">
                    <label>Sizes Created:</label>
                    <div>
                      {this.state.formData.sizeType ==
                      ProductSizeTypeEnum.little_choice
                        ? this.state.sizes.map((value, index) => (
                            <button
                              className="btn btn-outline-primary button-notification mr-2"
                              onClick={() => this.editSizeInventory(value)}
                            >
                              {value.title}
                              <span className="badge">{value.inventory}</span>
                            </button>
                          ))
                        : ""}

                      {this.state.formData.sizeType ==
                      ProductSizeTypeEnum.Lots_of_choice ? (
                        <div>
                          <select
                            className="form-control"
                            onChange={this.selectSize}
                            id="slcSizeSelected"
                          >
                            <option value=""></option>
                            {this.state.sizes.map((i) => (
                              <option value={i.id}>
                                {i.title}-({i.inventory} pieces)
                              </option>
                            ))}
                          </select>
                          <button
                            className="btn btn-warning m-1"
                            onClick={() =>
                              this.setState({
                                showSizeInventoryModal: 1,
                              })
                            }
                            id="btnEditSize"
                            disabled={
                              this.state.editSize.id != "" ? false : true
                            }
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-secondary m-1"
                            disabled={
                              this.state.editSize.id != "" ? false : true
                            }
                            onClick={() =>
                              this.setState({
                                showSizeInventoryModal: 1,
                                elementsSettings: {
                                  ...this.state.elementsSettings,
                                  detailsSizeModal: true,
                                },
                              })
                            }
                            style={{
                              display: this.state.showDetailPage
                                ? "block"
                                : "none",
                            }}
                          >
                            Detail
                          </button>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
                {/* ******************************************************************************** */}
              </div>
            </div>
            <div className="card-footer text-center cardF">
              <button
                className="btn btn-primary mr-1"
                name="save"
                id="btnSave"
                aria-label="Save"
                onClick={this.checkValidation}
              >
                Save
              </button>
              <button
                className="btn btn-secondary"
                name="cancel"
                id="btnCancel"
                aria-label="Cancel"
                onClick={this.cancel}
              >
                Cancel
              </button>
            </div>
          </div>
          <Modal show={this.state.showInventoryModal}>
            <Modal.Header>
              <h5>Edit Color Inventory</h5>
              <button
                type="button"
                className="btn btn-danger close"
                onClick={this.clearEditColor}
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </Modal.Header>
            <ModalBody>
              <div className="text-center mb-4">
                <label
                  className="label-circle"
                  style={{ backgroundColor: `${this.state.editColor.color}` }}
                />
              </div>
              <div className="position-relative">
                <label>Inventory:</label>
                <input
                  className="form-control mb-4"
                  name="inventory"
                  type="number"
                  placeholder="Enter Inventory"
                  onChange={this.setEditColor}
                  value={this.state.editColor.inventory}
                  disabled={this.state.elementsSettings.detailsColorModal}
                  style={
                    this.state.fieldColorValidations.editInventory
                      ? { borderColor: "#ced4da" }
                      : { borderColor: "#dc3545" }
                  }
                />
                <div
                  className="invalid-tooltip"
                  style={{
                    display: this.state.fieldColorValidations.editInventory
                      ? "none"
                      : "inline",
                  }}
                >
                  Please fill out this field.
                </div>
              </div>
              <div className="position-relative">
                <label>Price:</label>
                <div className="input-group">
                  <input
                    name="price"
                    type="number"
                    className="form-control"
                    value={this.state.editColor.price}
                    onChange={this.setEditColor}
                    aria-label="Amount (to the nearest dollar)"
                    placeholder="Enter Price"
                    disabled={this.state.elementsSettings.detailsColorModal}
                    style={
                      this.state.fieldColorValidations.editPrice
                        ? { borderColor: "#ced4da" }
                        : { borderColor: "#dc3545" }
                    }
                  />
                  <div className="input-group-append">
                    <span className="input-group-text">$</span>
                    <span className="input-group-text">0.00</span>
                  </div>
                  <div
                    className="invalid-tooltip"
                    style={{
                      display: this.state.fieldColorValidations.editPrice
                        ? "none"
                        : "inline",
                    }}
                  >
                    Please fill out this field.
                  </div>
                </div>
              </div>
            </ModalBody>
            <Modal.Footer>
              <div
                style={{
                  display: this.state.elementsSettings.detailsColorModal
                    ? "none"
                    : "block",
                }}
              >
                <button
                  type="button"
                  className="btn btn-danger mr-1"
                  onClick={() => this.unSelectColor(this.state.editColor.id)}
                  aria-label="Delete"
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="btn btn-secondary mr-1"
                  onClick={() => this.setState(this.clearEditColor)}
                  aria-label="Cancel"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={this.changeInventoryColor}
                  aria-label="Save"
                >
                  Save
                </button>
              </div>
              <div
                style={{
                  display: this.state.elementsSettings.detailsColorModal
                    ? "block"
                    : "none",
                }}
              >
                <button
                  type="button"
                  className="btn btn-secondary mr-1"
                  onClick={() => this.setState(this.clearEditColor)}
                  aria-label="Close"
                >
                  Close
                </button>
              </div>
            </Modal.Footer>
          </Modal>

          <Modal show={this.state.showSizeInventoryModal}>
            <Modal.Header>
              <h5>Edit Size Inventory</h5>
              <button
                type="button"
                className="btn btn-danger close"
                onClick={() =>
                  this.setState(
                    { showSizeInventoryModal: 0 },
                    this.clearEditSize
                  )
                }
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </Modal.Header>
            <ModalBody>
              <div className="text-center mb-4">
                <h3>{this.state.editSize.title}</h3>
              </div>
              <div className="text-center">
                {this.state.colors.map((i) =>
                  i.id == this.state.editSize.colorId ? (
                    <label
                      className="label-circle"
                      style={{
                        backgroundColor: `${i.color}`,
                      }}
                    />
                  ) : (
                    ""
                  )
                )}
              </div>
              <div className="position-relative">
                <label>Inventory:</label>
                <input
                  className="form-control mb-4"
                  name="inventory"
                  disabled={this.state.elementsSettings.detailsSizeModal}
                  type="number"
                  placeholder="Enter Inventory"
                  onChange={this.editSize}
                  value={this.state.editSize.inventory}
                  style={
                    this.state.fieldSizeValidations.editInventory
                      ? { borderColor: "#ced4da" }
                      : { borderColor: "#dc3545" }
                  }
                />
                <div
                  className="invalid-tooltip"
                  style={{
                    display: this.state.fieldSizeValidations.editInventory
                      ? "none"
                      : "inline",
                  }}
                >
                  Please fill out this field.
                </div>
              </div>
              <div className="position-relative">
                <label>Price:</label>
                <div className="input-group">
                  <input
                    name="price"
                    type="number"
                    className="form-control"
                    value={this.state.editSize.price}
                    onChange={this.editSize}
                    aria-label="Amount (to the nearest dollar)"
                    placeholder="Enter Size Price"
                    disabled={this.state.elementsSettings.detailsSizeModal}
                    style={
                      this.state.fieldSizeValidations.editPrice
                        ? { borderColor: "#ced4da" }
                        : { borderColor: "#dc3545" }
                    }
                  />
                  <div className="input-group-append">
                    <span className="input-group-text">$</span>
                    <span className="input-group-text">0.00</span>
                  </div>
                  <div
                    className="invalid-tooltip"
                    style={{
                      display: this.state.fieldSizeValidations.editPrice
                        ? "none"
                        : "inline",
                    }}
                  >
                    Please fill out this field.
                  </div>
                </div>
              </div>
            </ModalBody>
            <Modal.Footer>
              <div
                style={{
                  display: this.state.elementsSettings.detailsSizeModal
                    ? "none"
                    : "block",
                }}
              >
                <button
                  type="button"
                  className="btn btn-danger mr-1"
                  onClick={this.deleteSelectedSize}
                  aria-label="Delete"
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="btn btn-secondary mr-1"
                  onClick={() =>
                    this.setState(
                      { showSizeInventoryModal: 0 },
                      this.clearEditSize
                    )
                  }
                  aria-label="Cancel"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={this.changeSizeInventory}
                  aria-label="Save"
                >
                  Save
                </button>
              </div>
              <div
                style={{
                  display: this.state.elementsSettings.detailsSizeModal
                    ? "block"
                    : "none",
                }}
              >
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() =>
                    this.setState(
                      { showSizeInventoryModal: 0 },
                      this.clearEditSize
                    )
                  }
                  aria-label="Close"
                >
                  Close
                </button>
              </div>
            </Modal.Footer>
          </Modal>
        </section>
      );
    }
  }
}
